import { useEffect, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'leaflet-workspace-data';

// Module-level shared state (not per-instance)
let hasInitialized = false;
let initializedWorkspaceCode = '';
let inFlightInit: Promise<boolean> | null = null;
// Set when the user stops a tool by switching workspace: no auto-start until Save/Initiate or a new page load.
let autoInitSuppressed = false;

export const resetInitializationState = () => {
  hasInitialized = false;
  initializedWorkspaceCode = '';
  autoInitSuppressed = false;
  setToolStatus({ state: 'idle', tool: null });
};

export type ToolStatusState = 'idle' | 'loading' | 'active' | 'failed';
export interface ToolStatus {
  state: ToolStatusState;
  tool: 'productfruits' | 'usertour' | null;
  error?: string;
}

let toolStatus: ToolStatus = { state: 'idle', tool: null };
const statusListeners = new Set<() => void>();

export const setToolStatus = (next: ToolStatus) => {
  toolStatus = next;
  statusListeners.forEach(l => l());
};
export const getToolStatus = () => toolStatus;
export const subscribeToolStatus = (listener: () => void) => {
  statusListeners.add(listener);
  return () => { statusListeners.delete(listener); };
};
export const useToolStatus = () => useSyncExternalStore(subscribeToolStatus, getToolStatus, getToolStatus);

const hostOf = (url: string) => { try { return new URL(url).host; } catch { return url; } };

export const cleanupProductFruits = (): Promise<void> => {
  return new Promise((resolve) => {
    if ((window as any).productFruits?.services?.destroy) {
      try {
        (window as any).productFruits.services.destroy();
      } catch (e) {
        console.warn('PF destroy() threw:', e);
      }
    }

    setTimeout(() => {
      const pfElements = document.querySelectorAll(
        'script[src*="productfruits"], script[src*="pf.dev"], script[src*="/static/script.js"], ' +
        'script[data-productfruits-init], ' +
        '[id*="productfruits"], [class*="productfruits"], ' +
        'iframe[src*="productfruits"], iframe[src*="pf.dev"]'
      );
      pfElements.forEach(el => el.remove());

      const pfGlobals = ['$productFruits', 'productFruits', 'productFruitsIsReady', 'productFruitsUser'];
      pfGlobals.forEach(key => {
        try { delete (window as any)[key]; } catch (_) { (window as any)[key] = undefined; }
      });

      resolve();
    }, 300);
  });
};

// The real Usertour SDK is an ES module: once loaded, the browser will not run it
// again, so we keep a reference and reuse it on re-initialization.
let loadedUsertourSdk: any = null;

const removeUsertour = () => {
  const ut = (window as any).usertour;
  if (ut && ut._stubbed !== true) loadedUsertourSdk = ut;
  try { ut?.endAll?.(); } catch { /* ignore */ }
  try { ut?.reset?.(); } catch { /* ignore */ }
  document.querySelectorAll('script[data-usertour-init], script[src*="js.usertour.io"]').forEach(el => el.remove());
  try { delete (window as any).usertour; } catch { (window as any).usertour = undefined; }
  try { delete (window as any).USERTOURJS_QUEUE; } catch { (window as any).USERTOURJS_QUEUE = undefined; }
};

/** Fully stop whichever tool is running and reset init state. */
const PF_DOM_SELECTOR =
  'script[src*="productfruits"], script[src*="pf.dev"], script[data-productfruits-init], ' +
  '[id*="productfruits"], [class*="productfruits"], iframe[src*="productfruits"], iframe[src*="pf.dev"]';

export const teardownActiveTool = async (): Promise<void> => {
  // Stop immediately: destroy, hide widgets, reset status — no delay visible to the user.
  try { (window as any).productFruits?.services?.destroy?.(); } catch (e) { console.warn('PF destroy() threw:', e); }
  document.querySelectorAll(PF_DOM_SELECTOR).forEach(el => el.remove());
  removeUsertour();
  resetInitializationState();
  autoInitSuppressed = true;
  const generation = ++teardownGeneration;
  // Second pass once the SDK finished its async teardown, unless a new init started meanwhile.
  await new Promise(r => setTimeout(r, 300));
  if (generation !== teardownGeneration || getToolStatus().state !== 'idle') return;
  document.querySelectorAll(PF_DOM_SELECTOR).forEach(el => el.remove());
  ['$productFruits', 'productFruits', 'productFruitsIsReady', 'productFruitsUser'].forEach(key => {
    try { delete (window as any)[key]; } catch (_) { (window as any)[key] = undefined; }
  });
};
let teardownGeneration = 0;

export const useProductFruits = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard') && !hasInitialized && !autoInitSuppressed) {
      const success = initializeFromStorage();
      // Retry once after 500ms if first attempt found no data (race condition with login)
      if (!success) {
        const timer = setTimeout(() => {
          if (!hasInitialized && !autoInitSuppressed) {
            initializeFromStorage();
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname]);

  const initializeFromStorage = (): boolean => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const workspaceData = JSON.parse(savedData);
        
        if (workspaceData.workspaceCode && workspaceData.username) {
          initializeProductFruits(workspaceData);
          initializedWorkspaceCode = workspaceData.workspaceCode;
          hasInitialized = true;
          return true;
        }
      }
    } catch (error) {
      console.error('Error loading workspace data from localStorage:', error);
    }
    return false;
  };

  const getScriptUrl = (selectedWorkspace?: string, customUrl?: string) => {
    if (selectedWorkspace === 'custom-dev' && customUrl) {
      const url = customUrl.endsWith('/') ? customUrl.slice(0, -1) : customUrl;
      return `${url}/static/script.js`;
    }
    if (selectedWorkspace?.startsWith('pr')) {
      const prHost = selectedWorkspace === 'pr1' ? 'my-pr' : `my-${selectedWorkspace}`;
      return `https://${prHost}.ohio.pf.dev/static/script.js`;
    }
    return 'https://app.productfruits.com/static/script.js';
  };

  const initializeUsertour = async (dataToUse: any): Promise<boolean> => {
    // Tear down any PF instance first
    if (hasInitialized || (window as any).productFruits?.services) {
      await cleanupProductFruits();
    }

    const currentUt = (window as any).usertour;
    if (currentUt && currentUt._stubbed !== true) loadedUsertourSdk = currentUt;

    // Remove prior Usertour script/globals so re-init works
    try { currentUt?.endAll?.(); } catch { /* ignore */ }
    try { currentUt?.reset?.(); } catch { /* ignore */ }
    document.querySelectorAll('script[data-usertour-init], script[src*="js.usertour.io"]').forEach(el => el.remove());
    try { delete (window as any).usertour; } catch { (window as any).usertour = undefined; }
    try { delete (window as any).USERTOURJS_QUEUE; } catch { (window as any).USERTOURJS_QUEUE = undefined; }

    const token = (dataToUse.usertourToken || '').trim();
    if (!token) {
      console.error('Usertour initialization aborted: missing Usertour.js token');
      setToolStatus({ state: 'failed', tool: 'usertour', error: 'Missing Usertour.js token' });
      return false;
    }
    setToolStatus({ state: 'loading', tool: 'usertour' });
    const userId = dataToUse.username || dataToUse.email || 'anonymous';
    const name = [dataToUse.firstName, dataToUse.lastName].filter(Boolean).join(' ') || dataToUse.username;
    const signedUpAt = new Date().toISOString();

    const identifyProps: Record<string, string> = { signed_up_at: signedUpAt };
    if (name) identifyProps.name = name;
    if (dataToUse.email) identifyProps.email = dataToUse.email;

    if (loadedUsertourSdk) {
      try {
        (window as any).usertour = loadedUsertourSdk;
        await loadedUsertourSdk.init(token);
        await loadedUsertourSdk.identify(userId, identifyProps);
        initializedWorkspaceCode = dataToUse.workspaceCode || 'usertour';
        hasInitialized = true;
        setToolStatus({ state: 'active', tool: 'usertour' });
        console.log('Usertour re-initialized with already loaded SDK.');
        return true;
      } catch (e) {
        console.error('Usertour re-initialization failed:', e);
        setToolStatus({ state: 'failed', tool: 'usertour', error: 'Usertour re-initialization failed' });
        return false;
      }
    }

    const snippet = `!function(){var e="undefined"==typeof window?{}:window,r=e.usertour;if(!r){var t="https://js.usertour.io/",n=null;r=e.usertour={_stubbed:!0,load:function(){return n||(n=new Promise((function(r,o){var s=document.createElement("script");s.async=!0;var i=e.USERTOURJS_ENV_VARS||{};"es2020"===(i.USERTOURJS_BROWSER_TARGET||function(e){for(var r=[[/Edg\\//,/Edg\\/(\\d+)/,80],[/OPR\\//,/OPR\\/(\\d+)/,67],[/Chrome\\//,/Chrome\\/(\\d+)/,80],[/CriOS\\//,/CriOS\\/(\\d+)/,100],[/Safari\\//,/Version\\/(\\d+)/,14],[/Firefox\\//,/Firefox\\/(\\d+)/,74]],t=0;t<r.length;t++){var n=r[t],o=n[0],s=n[1],i=n[2];if(e.match(o)){var u=e.match(new RegExp(s));if(u&&parseInt(u[1],10)>=i)return"es2020";break}}return"legacy"}(navigator.userAgent))?(s.type="module",s.src=i.USERTOURJS_ES2020_URL||t+"es2020/usertour.js"):s.src=i.USERTOURJS_LEGACY_URL||t+"legacy/usertour.iife.js",s.onload=function(){r()},s.onerror=function(){document.head.removeChild(s),n=null;var e=new Error("Could not load Usertour.js");console.warn(e.message),o(e)},document.head.appendChild(s)}))),n}};var o=e.USERTOURJS_QUEUE=e.USERTOURJS_QUEUE||[],s=function(e){r[e]=function(){var t=Array.prototype.slice.call(arguments);r.load(),o.push([e,null,t])}},i=function(e){r[e]=function(){var t,n=Array.prototype.slice.call(arguments);r.load();var s=new Promise((function(e,r){t={resolve:e,reject:r}}));return o.push([e,t,n]),s}},u=function(e,t){r[e]=function(){return t}};s("disableEvalJs"),s("init"),s("off"),s("on"),s("registerCustomInput"),s("reset"),s("setBaseZIndex"),s("setSessionTimeout"),s("setTargetMissingSeconds"),s("setCustomInputSelector"),s("setCustomNavigate"),s("setCustomScrollIntoView"),s("setInferenceAttributeFilter"),s("setInferenceAttributeNames"),s("setInferenceClassNameFilter"),s("setScrollPadding"),s("setServerEndpoint"),s("setShadowDomEnabled"),s("setPageTrackingDisabled"),s("setUrlFilter"),s("setLinkUrlDecorator"),s("openResourceCenter"),s("closeResourceCenter"),s("toggleResourceCenter"),s("showResourceCenterLauncher"),s("hideResourceCenterLauncher"),i("endAll"),i("group"),i("identify"),i("identifyAnonymous"),i("start"),i("track"),i("updateGroup"),i("updateUser"),u("isIdentified",!1),u("isResourceCenterOpen",!1),u("isStarted",!1)}}();`;

    const stubScript = document.createElement('script');
    stubScript.setAttribute('data-usertour-init', 'true');
    stubScript.text = snippet;
    document.head.appendChild(stubScript);

    try {
      (window as any).usertour.init(token);
      (window as any).usertour.identify(userId, identifyProps);
      console.log('Usertour init queued for token:', token, 'user:', userId, identifyProps);
    } catch (e) {
      console.error('Usertour initialization failed:', e);
      setToolStatus({ state: 'failed', tool: 'usertour', error: 'Usertour initialization failed' });
      return false;
    }

    // Watch <head> for the actual usertour.js <script> tag the stub injects,
    // so we can catch load failures explicitly.
    let sdkScriptEl: HTMLScriptElement | null = null;
    let scriptFailed = false;
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (
            node instanceof HTMLScriptElement &&
            typeof node.src === 'string' &&
            node.src.includes('js.usertour.io')
          ) {
            sdkScriptEl = node;
            node.addEventListener('error', () => {
              scriptFailed = true;
              console.error(`Failed to load Usertour SDK from: ${node.src}`);
            });
          }
        });
      }
    });
    observer.observe(document.head, { childList: true });

    // Poll for the real SDK replacing the stub (real SDK removes `_stubbed`).
    const loaded = await new Promise<boolean>((resolve) => {
      const start = Date.now();
      const interval = setInterval(() => {
        const ut = (window as any).usertour;
        if (ut && ut._stubbed !== true) {
          clearInterval(interval);
          resolve(true);
          return;
        }
        if (scriptFailed) {
          clearInterval(interval);
          resolve(false);
          return;
        }
        if (Date.now() - start > 10000) {
          clearInterval(interval);
          console.error(
            `Usertour script timed out after 10s${sdkScriptEl ? ` (src=${sdkScriptEl.src})` : ''}`
          );
          resolve(false);
        }
      }, 100);
    });
    observer.disconnect();

    if (!loaded) {
      setToolStatus({ state: 'failed', tool: 'usertour', error: `Could not reach ${sdkScriptEl ? hostOf(sdkScriptEl.src) : 'js.usertour.io'}` });
      return false;
    }

    setToolStatus({ state: 'active', tool: 'usertour' });
    console.log('Usertour SDK loaded successfully.');
    initializedWorkspaceCode = dataToUse.workspaceCode || 'usertour';
    hasInitialized = true;
    return true;
  };

  const initializeProductFruits = (workspaceData?: any): Promise<boolean> => {
    // Collapse concurrent calls into one initialization.
    if (inFlightInit) return inFlightInit;
    // Mark the session as started so the dashboard auto-start never runs a second init.
    hasInitialized = true;
    autoInitSuppressed = false;
    inFlightInit = runInitialization(workspaceData)
      .then((ok) => {
        if (ok) {
          try {
            const saved = workspaceData ?? JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
            initializedWorkspaceCode = saved?.workspaceCode ?? initializedWorkspaceCode;
          } catch { /* ignore */ }
        }
        return ok;
      })
      .finally(() => { inFlightInit = null; });
    return inFlightInit;
  };

  const runInitialization = async (workspaceData?: any): Promise<boolean> => {
    let dataToUse = workspaceData;
    
    if (!dataToUse) {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          dataToUse = JSON.parse(savedData);
        }
      } catch (error) {
        console.error('Error loading workspace data from localStorage:', error);
        return false;
      }
    }

    if (!dataToUse) {
      console.log('Missing workspace data for initialization');
      return false;
    }

    // Usertour branch (internal @productfruits.com users)
    if (dataToUse.selectedWorkspace === 'usertour') {
      return initializeUsertour(dataToUse);
    }

    if (!dataToUse.workspaceCode || !dataToUse.username) {
      console.log('Missing required workspace data for ProductFruits initialization');
      setToolStatus({ state: 'failed', tool: 'productfruits', error: 'Missing workspace code or username' });
      return false;
    }

    // Step 1: Only clean up if there's an existing PF instance
    if (hasInitialized || (window as any).productFruits?.services) {
      await cleanupProductFruits();
    }

    // Step 2: Set up fresh globals
    (window as any).$productFruits = [];
    (window as any).productFruits = {};
    (window as any).productFruits.scrV = '2';

    // Step 3: Build init data
    const props: Record<string, string> = {};
    if (dataToUse.customProperties && Array.isArray(dataToUse.customProperties)) {
      dataToUse.customProperties.forEach((prop: any) => {
        if (prop.name && prop.value) {
          props[prop.name] = prop.value;
        }
      });
    }

    const signUpDate = new Date().toISOString();

    const initData = {
      username: dataToUse.username,
      ...(dataToUse.email && { email: dataToUse.email }),
      ...(dataToUse.firstName && { firstname: dataToUse.firstName }),
      ...(dataToUse.lastName && { lastname: dataToUse.lastName }),
      signUpAt: signUpDate,
      ...(dataToUse.role && { role: dataToUse.role }),
      ...(Object.keys(props).length > 0 && { props })
    };

    const languageCode = dataToUse.languageCode || 'en';

    // Step 4: Push init command to queue
    (window as any).$productFruits.push(['init', dataToUse.workspaceCode, languageCode, initData]);

    // Step 5: Load new script and wait for it
    return new Promise<boolean>((resolve) => {
      const mainScript = document.createElement('script');
      mainScript.async = true;
      const scriptUrl = getScriptUrl(dataToUse.selectedWorkspace, dataToUse.customUrl);
      const fullUrl = `${scriptUrl}?c=${dataToUse.workspaceCode}`;
      mainScript.src = fullUrl;
      let settled = false;

      const timeout = setTimeout(() => {
        if (!settled) {
          settled = true;
          console.error(`ProductFruits script timed out after 10s: ${fullUrl}`);
          setToolStatus({ state: 'failed', tool: 'productfruits', error: `Could not reach ${hostOf(fullUrl)} (timed out)` });
          resolve(false);
        }
      }, 10000);

      mainScript.onload = () => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          console.log('ProductFruits script loaded successfully for workspace:', dataToUse.workspaceCode);
          initializedWorkspaceCode = dataToUse.workspaceCode;
          hasInitialized = true;
          setToolStatus({ state: 'active', tool: 'productfruits' });
          resolve(true);
        }
      };

      mainScript.onerror = () => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          console.error(`Failed to load ProductFruits script from: ${fullUrl}`);
          setToolStatus({ state: 'failed', tool: 'productfruits', error: `Could not reach ${hostOf(fullUrl)}` });
          resolve(false);
        }
      };

      setToolStatus({ state: 'loading', tool: 'productfruits' });
      document.head.appendChild(mainScript);
      console.log('ProductFruits initializing with workspace code:', dataToUse.workspaceCode);
      console.log('Initialization data:', initData);
    });
  };

  const hasWorkspaceCodeChanged = (currentWorkspaceCode: string) => {
    return hasInitialized && 
           currentWorkspaceCode !== initializedWorkspaceCode &&
           currentWorkspaceCode !== '';
  };

  return {
    initializeProductFruits,
    hasWorkspaceCodeChanged,
    canAutoInitialize: location.pathname.startsWith('/dashboard')
  };
};
