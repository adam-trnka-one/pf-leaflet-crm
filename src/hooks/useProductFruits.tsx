
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

  useEffect(() => {
    // Listen for language changes and re-initialize ProductFruits
    const handleLanguageChange = (event: CustomEvent) => {
      if (hasInitialized.current) {
        initializeFromStorage();
      }
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  // Remove the language-dependent useEffect for now

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

    // Get the ProductFruits environment URL
    const environment = dataToUse.productFruitsEnvironment || 'https://app.productfruits.com';
    
    // Remove existing ProductFruits scripts if they exist
    const existingInitScript = document.querySelector('script[data-productfruits-init]');
    if (existingInitScript) {
      existingInitScript.remove();
    }
    
    const existingMainScript = document.querySelector('script[src*="productfruits.com"]');
    if (existingMainScript) {
      existingMainScript.remove();
    }

    // Clear existing ProductFruits global variables
    if (window.$productFruits) {
      window.$productFruits = [];
    }
    if (window.productFruits) {
      delete window.productFruits;
    }

    // Load the ProductFruits main script from the correct environment
    const mainScript = document.createElement('script');
    mainScript.type = 'text/javascript';
    mainScript.async = true;
    mainScript.src = `${environment}/static/script.js`;
    
    mainScript.onload = () => {
      // Initialize ProductFruits after the main script loads
      setTimeout(() => {
        initializeWithEnvironment(dataToUse, environment);
      }, 100);
    };
    
    document.head.appendChild(mainScript);
  };

  const initializeWithEnvironment = (dataToUse: any, environment: string) => {
    // Ensure ProductFruits global is available
    if (!window.$productFruits) {
      window.$productFruits = [];
      window.productFruits = window.productFruits || {};
      window.productFruits.scrV = '2';
    }

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

    // Create the initialization script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('data-productfruits-init', 'true');
    
    // Get current language code
    const languageCode = localStorage.getItem('leaflet-language') || 'en';
    
    script.innerHTML = `
      if (window.$productFruits) {
        window.$productFruits.push(['init', '${dataToUse.workspaceCode}', '${languageCode}', ${JSON.stringify(initData)}]);
      }
    `;

    document.head.appendChild(script);
    console.log('ProductFruits initialized with workspace code:', dataToUse.workspaceCode);
    console.log('ProductFruits environment:', environment);
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
