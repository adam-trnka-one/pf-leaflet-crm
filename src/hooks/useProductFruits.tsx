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
      return `https://my-pr.ohio.pf.dev/static/script.js`;
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

    if (!dataToUse || !dataToUse.workspaceCode || !dataToUse.username) {
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
