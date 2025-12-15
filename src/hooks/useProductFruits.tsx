import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'leaflet-workspace-data';

export type ProductFruitsStatus = 'idle' | 'loading' | 'initialized' | 'error';

export interface ProductFruitsState {
  status: ProductFruitsStatus;
  workspaceCode: string;
  language: string;
  userData: Record<string, any> | null;
  scriptUrl: string;
  lastInitialized: Date | null;
  error: string | null;
}

export const useProductFruits = () => {
  const location = useLocation();
  const initializedWorkspaceCode = useRef<string>('');
  const currentLanguage = useRef<string>('');
  const hasInitialized = useRef<boolean>(false);
  const isInitializing = useRef<boolean>(false);

  const [state, setState] = useState<ProductFruitsState>({
    status: 'idle',
    workspaceCode: '',
    language: '',
    userData: null,
    scriptUrl: '',
    lastInitialized: null,
    error: null,
  });

  useEffect(() => {
    // Only initialize ProductFruits on dashboard pages and only once
    if (location.pathname.startsWith('/dashboard') && !hasInitialized.current) {
      initializeFromStorage();
    }
  }, [location.pathname]);

  const initializeFromStorage = () => {
    // Prevent multiple calls
    if (hasInitialized.current || isInitializing.current) {
      return;
    }
    
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const workspaceData = JSON.parse(savedData);
        
        if (workspaceData.workspaceCode && workspaceData.username) {
          hasInitialized.current = true;
          initializeProductFruits(workspaceData);
          initializedWorkspaceCode.current = workspaceData.workspaceCode;
        }
      }
    } catch (error) {
      console.error('Error loading workspace data from localStorage:', error);
    }
  };

  const getScriptUrl = (selectedWorkspace?: string, customUrl?: string) => {
    // Custom dev environment with user-specified URL
    if (selectedWorkspace === 'custom-dev' && customUrl) {
      const url = customUrl.endsWith('/') ? customUrl.slice(0, -1) : customUrl;
      return `${url}/static/script.js`;
    }
    // PR environments (pr1, pr2, pr3, pr4, pr5)
    if (selectedWorkspace?.startsWith('pr')) {
      return `https://my-${selectedWorkspace}.ohio.pf.dev/static/script.js`;
    }
    // All other cases (production workspaces like "jess", etc.) use production URL
    return 'https://app.productfruits.com/static/script.js';
  };

  const getLanguageCode = (): string => {
    // Get language from localStorage, default to 'en'
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'cs', 'fr', 'ar', 'pt'].includes(savedLanguage)) {
      return savedLanguage;
    }
    return 'en';
  };

  const destroyProductFruits = async () => {
    // Destroy existing ProductFruits instance thoroughly
    const existingPF = (window as any).$productFruits;
    if (existingPF && typeof existingPF.push === 'function') {
      try {
        existingPF.push(['destroy']);
        console.log('ProductFruits destroyed');
        // Wait for destroy to complete
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (e) {
        console.log('ProductFruits destroy failed:', e);
      }
    }
    
    // Clear ALL ProductFruits globals
    delete (window as any).$productFruits;
    delete (window as any).productFruits;
    delete (window as any).productFruitsInit;
    delete (window as any).productFruitsInit2;
    delete (window as any).productFruitsUser;
    delete (window as any).productFruitsReady;

    // Remove ALL existing ProductFruits scripts
    const existingScripts = document.querySelectorAll('script[src*="productfruits"], script[src*="pf.dev"], script[data-productfruits-init]');
    existingScripts.forEach(script => script.remove());
    
    // Wait a bit more after removing scripts
    await new Promise(resolve => setTimeout(resolve, 200));
  };

  const initializeProductFruits = useCallback(async (workspaceData?: any, forceReinit = false) => {
    // Prevent concurrent initializations
    if (isInitializing.current) {
      console.log('ProductFruits initialization already in progress, skipping');
      return;
    }
    
    isInitializing.current = true;
    setState(prev => ({ ...prev, status: 'loading', error: null }));

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
        isInitializing.current = false;
        setState(prev => ({ ...prev, status: 'error', error: 'Failed to load workspace data' }));
        return;
      }
    }

    if (!dataToUse || !dataToUse.workspaceCode || !dataToUse.username) {
      console.log('Missing required workspace data for ProductFruits initialization');
      isInitializing.current = false;
      setState(prev => ({ ...prev, status: 'error', error: 'Missing workspace code or username' }));
      return;
    }

    // Get current language
    const languageCode = getLanguageCode();

    // Clean up existing ProductFruits instance
    await destroyProductFruits();

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

    // Set up the productFruitsReady callback BEFORE loading script
    (window as any).productFruitsReady = function() {
      console.log('ProductFruits is ready! (via productFruitsReady callback)');
      
      // Auto-attach newsfeed widget
      setTimeout(() => {
        const launcher = document.getElementById('newsfeed-launcher');
        if (launcher && (window as any).productFruits?.api?.announcementsV2) {
          (window as any).productFruits.api.announcementsV2.attachNewsWidgetToElement(launcher);
          console.log('Newsfeed widget auto-attached to launcher');
        }
      }, 100);
      
      isInitializing.current = false;
      setState(prev => ({
        ...prev,
        status: 'initialized',
        lastInitialized: new Date(),
        error: null,
      }));
    };

    // Create and add the new main ProductFruits script with correct URL and cache-busting
    const mainScript = document.createElement('script');
    mainScript.async = true;
    const scriptUrl = getScriptUrl(dataToUse.selectedWorkspace, dataToUse.customUrl);
    // Add cache-busting timestamp to force fresh script on reinit
    mainScript.src = `${scriptUrl}?c=${dataToUse.workspaceCode}&t=${Date.now()}`;

    // Update state with loading info
    setState(prev => ({
      ...prev,
      workspaceCode: dataToUse.workspaceCode,
      language: languageCode,
      userData: initData,
      scriptUrl: scriptUrl,
    }));
    
    // Wait for script to load before initializing
    mainScript.onload = () => {
      const initScript = document.createElement('script');
      initScript.type = 'text/javascript';
      initScript.setAttribute('data-productfruits-init', 'true');
      initScript.innerHTML = `
        window.$productFruits = window.$productFruits || [];
        window.$productFruits.push(['init', '${dataToUse.workspaceCode}', '${languageCode}', ${JSON.stringify(initData)}]);
      `;
      document.head.appendChild(initScript);
      console.log('ProductFruits init command pushed with workspace code:', dataToUse.workspaceCode);
      console.log('ProductFruits language:', languageCode);
      console.log('Initialization data:', initData);
      
      // Update current language ref
      currentLanguage.current = languageCode;
    };

    mainScript.onerror = () => {
      console.error('Failed to load ProductFruits script');
      isInitializing.current = false;
      setState(prev => ({
        ...prev,
        status: 'error',
        error: 'Failed to load ProductFruits script',
      }));
    };
    
    document.head.appendChild(mainScript);

    // Update the tracking reference
    initializedWorkspaceCode.current = dataToUse.workspaceCode;
  }, []);

  const reinitializeWithLanguage = useCallback(async () => {
    const newLanguage = getLanguageCode();
    
    // Only reinit if language actually changed
    if (currentLanguage.current === newLanguage && currentLanguage.current !== '') {
      console.log('Language unchanged, skipping reinit');
      return;
    }
    
    console.log(`Language changed from "${currentLanguage.current}" to "${newLanguage}", reinitializing ProductFruits...`);
    
    // Force full reinitialization
    hasInitialized.current = false;
    await initializeProductFruits(undefined, true);
  }, [initializeProductFruits]);

  const hasWorkspaceCodeChanged = (currentWorkspaceCode: string) => {
    return hasInitialized.current && 
           currentWorkspaceCode !== initializedWorkspaceCode.current &&
           currentWorkspaceCode !== '';
  };

  return {
    initializeProductFruits,
    reinitializeWithLanguage,
    hasWorkspaceCodeChanged,
    canAutoInitialize: location.pathname.startsWith('/dashboard'),
    state,
  };
};