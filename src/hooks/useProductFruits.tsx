
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'leaflet-workspace-data';

export const useProductFruits = () => {
  const location = useLocation();
  const initializedWorkspaceCode = useRef<string>('');
  const hasInitialized = useRef<boolean>(false);

  useEffect(() => {
    // Only initialize ProductFruits on dashboard pages
    if (location.pathname.startsWith('/dashboard')) {
      initializeFromStorage();
    }
  }, [location.pathname]);

  const initializeFromStorage = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const workspaceData = JSON.parse(savedData);
        
        if (workspaceData.workspaceCode && workspaceData.username) {
          initializeProductFruits(workspaceData);
          initializedWorkspaceCode.current = workspaceData.workspaceCode;
          hasInitialized.current = true;
        }
      }
    } catch (error) {
      console.error('Error loading workspace data from localStorage:', error);
    }
  };

  const getScriptUrl = (selectedWorkspace?: string) => {
    if (selectedWorkspace?.startsWith('pr')) {
      return `https://my-${selectedWorkspace}.ohio.pf.dev/static/script.js`;
    }
    return 'https://app.productfruits.com/static/script.js';
  };

  const initializeProductFruits = (workspaceData?: any) => {
    let dataToUse = workspaceData;
    
    // If no data provided, load from localStorage
    if (!dataToUse) {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          dataToUse = JSON.parse(savedData);
        }
      } catch (error) {
        console.error('Error loading workspace data from localStorage:', error);
        return;
      }
    }

    if (!dataToUse || !dataToUse.workspaceCode || !dataToUse.username) {
      console.log('Missing required workspace data for ProductFruits initialization');
      return;
    }

    // Remove existing ProductFruits scripts including the static one from index.html
    const existingScripts = document.querySelectorAll('script[src*="productfruits"], script[src*="pf.dev"], script[data-productfruits-init]');
    existingScripts.forEach(script => script.remove());
    
    // Also remove the static ProductFruits script from index.html if it exists
    const staticScript = document.querySelector('script[src="https://app.productfruits.com/static/script.js"]');
    if (staticScript) {
      staticScript.remove();
    }

    // Create and add the new main ProductFruits script with correct URL
    const mainScript = document.createElement('script');
    mainScript.async = true;
    const scriptUrl = getScriptUrl(dataToUse.selectedWorkspace);
    mainScript.src = `${scriptUrl}?c=${dataToUse.workspaceCode}`;
    document.head.appendChild(mainScript);

    // Create the initialization script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('data-productfruits-init', 'true');
    
    // Build props object from custom properties
    const props: Record<string, string> = {};
    if (dataToUse.customProperties && Array.isArray(dataToUse.customProperties)) {
      dataToUse.customProperties.forEach((prop: any) => {
        if (prop.name && prop.value) {
          props[prop.name] = prop.value;
        }
      });
    }

    // Generate sign-up date in required format (current date as example)
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

    script.innerHTML = `
      if (window.$productFruits) {
        window.$productFruits.push(['init', '${dataToUse.workspaceCode}', 'en', ${JSON.stringify(initData)}]);
      }
    `;

    document.head.appendChild(script);
    console.log('ProductFruits initialized with workspace code:', dataToUse.workspaceCode);
    console.log('Initialization data:', initData);

    // Update the tracking reference
    initializedWorkspaceCode.current = dataToUse.workspaceCode;
  };

  const hasWorkspaceCodeChanged = (currentWorkspaceCode: string) => {
    return hasInitialized.current && 
           currentWorkspaceCode !== initializedWorkspaceCode.current &&
           currentWorkspaceCode !== '';
  };

  return {
    initializeProductFruits,
    hasWorkspaceCodeChanged,
    canAutoInitialize: location.pathname.startsWith('/dashboard')
  };
};
