import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'leaflet-workspace-data';

// Module-level shared state (not per-instance)
let hasInitialized = false;
let initializedWorkspaceCode = '';

export const resetInitializationState = () => {
  hasInitialized = false;
  initializedWorkspaceCode = '';
};

export const useProductFruits = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard') && !hasInitialized) {
      const success = initializeFromStorage();
      // Retry once after 500ms if first attempt found no data (race condition with login)
      if (!success) {
        const timer = setTimeout(() => {
          if (!hasInitialized) {
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

  const cleanupProductFruits = (): Promise<void> => {
    return new Promise((resolve) => {
      // Step 1: Call official destroy if available
      if ((window as any).productFruits?.services?.destroy) {
        try {
          (window as any).productFruits.services.destroy();
        } catch (e) {
          console.warn('PF destroy() threw:', e);
        }
      }

      // Step 2: Wait for SDK to tear down internally
      setTimeout(() => {
        // Step 3: Remove ALL PF-injected DOM elements (scripts, iframes, styles, divs)
        const pfElements = document.querySelectorAll(
          'script[src*="productfruits"], script[src*="pf.dev"], script[src*="/static/script.js"], ' +
          'script[data-productfruits-init], ' +
          '[id*="productfruits"], [class*="productfruits"], ' +
          'iframe[src*="productfruits"], iframe[src*="pf.dev"]'
        );
        pfElements.forEach(el => el.remove());

        // Also remove the static script
        const staticScript = document.querySelector('script[src="https://app.productfruits.com/static/script.js"]');
        if (staticScript) staticScript.remove();

        // Step 4: Clean up ALL PF-related globals
        const pfGlobals = ['$productFruits', 'productFruits', 'productFruitsIsReady', 'productFruitsUser'];
        pfGlobals.forEach(key => {
          try { delete (window as any)[key]; } catch (_) { (window as any)[key] = undefined; }
        });

        resolve();
      }, 300);
    });
  };

  const initializeUsertour = async (dataToUse: any): Promise<boolean> => {
    // Tear down any PF instance first
    if (hasInitialized || (window as any).productFruits?.services) {
      await cleanupProductFruits();
    }

    // Remove prior Usertour script/globals so re-init works
    document.querySelectorAll('script[data-usertour-init], script[src*="js.usertour.io"]').forEach(el => el.remove());
    try { delete (window as any).usertour; } catch { (window as any).usertour = undefined; }
    try { delete (window as any).USERTOURJS_QUEUE; } catch { (window as any).USERTOURJS_QUEUE = undefined; }

    const token = 'cmr37t88s033rl254qni6mf0o';
    const userId = dataToUse.username || dataToUse.email || 'anonymous';
    const name = [dataToUse.firstName, dataToUse.lastName].filter(Boolean).join(' ') || dataToUse.username;
    const signedUpAt = new Date().toISOString();

    const identifyProps: Record<string, string> = { signed_up_at: signedUpAt };
    if (name) identifyProps.name = name;
    if (dataToUse.email) identifyProps.email = dataToUse.email;

    const snippet = `!function(){var e="undefined"==typeof window?{}:window,r=e.usertour;if(!r){var t="https://js.usertour.io/",n=null;r=e.usertour={_stubbed:!0,load:function(){return n||(n=new Promise((function(r,o){var s=document.createElement("script");s.async=!0;var i=e.USERTOURJS_ENV_VARS||{};"es2020"===(i.USERTOURJS_BROWSER_TARGET||function(e){for(var r=[[/Edg\\//,/Edg\\/(\\d+)/,80],[/OPR\\//,/OPR\\/(\\d+)/,67],[/Chrome\\//,/Chrome\\/(\\d+)/,80],[/CriOS\\//,/CriOS\\/(\\d+)/,100],[/Safari\\//,/Version\\/(\\d+)/,14],[/Firefox\\//,/Firefox\\/(\\d+)/,74]],t=0;t<r.length;t++){var n=r[t],o=n[0],s=n[1],i=n[2];if(e.match(o)){var u=e.match(new RegExp(s));if(u&&parseInt(u[1],10)>=i)return"es2020";break}}return"legacy"}(navigator.userAgent))?(s.type="module",s.src=i.USERTOURJS_ES2020_URL||t+"es2020/usertour.js"):s.src=i.USERTOURJS_LEGACY_URL||t+"legacy/usertour.iife.js",s.onload=function(){r()},s.onerror=function(){document.head.removeChild(s),n=null;var e=new Error("Could not load Usertour.js");console.warn(e.message),o(e)},document.head.appendChild(s)}))),n}};var o=e.USERTOURJS_QUEUE=e.USERTOURJS_QUEUE||[],s=function(e){r[e]=function(){var t=Array.prototype.slice.call(arguments);r.load(),o.push([e,null,t])}},i=function(e){r[e]=function(){var t,n=Array.prototype.slice.call(arguments);r.load();var s=new Promise((function(e,r){t={resolve:e,reject:r}}));return o.push([e,t,n]),s}},u=function(e,t){r[e]=function(){return t}};s("disableEvalJs"),s("init"),s("off"),s("on"),s("registerCustomInput"),s("reset"),s("setBaseZIndex"),s("setSessionTimeout"),s("setTargetMissingSeconds"),s("setCustomInputSelector"),s("setCustomNavigate"),s("setCustomScrollIntoView"),s("setInferenceAttributeFilter"),s("setInferenceAttributeNames"),s("setInferenceClassNameFilter"),s("setScrollPadding"),s("setServerEndpoint"),s("setShadowDomEnabled"),s("setPageTrackingDisabled"),s("setUrlFilter"),s("setLinkUrlDecorator"),s("openResourceCenter"),s("closeResourceCenter"),s("toggleResourceCenter"),s("showResourceCenterLauncher"),s("hideResourceCenterLauncher"),i("endAll"),i("group"),i("identify"),i("identifyAnonymous"),i("start"),i("track"),i("updateGroup"),i("updateUser"),u("isIdentified",!1),u("isResourceCenterOpen",!1),u("isStarted",!1)}}();`;

    const stubScript = document.createElement('script');
    stubScript.setAttribute('data-usertour-init', 'true');
    stubScript.text = snippet;
    document.head.appendChild(stubScript);

    try {
      (window as any).usertour.init(token);
      (window as any).usertour.identify(userId, identifyProps);
      console.log('Usertour initialized with token:', token, 'user:', userId, identifyProps);
    } catch (e) {
      console.error('Usertour initialization failed:', e);
      return false;
    }

    initializedWorkspaceCode = dataToUse.workspaceCode || 'usertour';
    hasInitialized = true;
    return true;
  };

  const initializeProductFruits = async (workspaceData?: any): Promise<boolean> => {
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
          resolve(true);
        }
      };

      mainScript.onerror = () => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          console.error(`Failed to load ProductFruits script from: ${fullUrl}`);
          resolve(false);
        }
      };

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
