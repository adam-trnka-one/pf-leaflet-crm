// ProductFruits Context Provider - centralizes all ProductFruits state and initialization logic
import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';
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

interface ProductFruitsContextValue {
  state: ProductFruitsState;
  initializeProductFruits: (workspaceData?: any, forceReinit?: boolean) => Promise<void>;
  reinitializeWithLanguage: () => Promise<void>;
  hasWorkspaceCodeChanged: (currentWorkspaceCode: string) => boolean;
  canAutoInitialize: boolean;
  resetProductFruitsState: () => void;
}

const ProductFruitsContext = createContext<ProductFruitsContextValue | null>(null);

// Counter for debug instance IDs
let hookInstanceCounter = 0;

export const ProductFruitsProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const initializedWorkspaceCode = useRef<string>('');
  const currentLanguage = useRef<string>('');
  const hasInitialized = useRef<boolean>(false);
  const isInitializing = useRef<boolean>(false);
  const providerInstanceId = useRef(Math.random().toString(36).substring(7));

  console.log(`[ProductFruits] Provider instance ${providerInstanceId.current} mounted`);

  const [state, setState] = useState<ProductFruitsState>({
    status: 'idle',
    workspaceCode: '',
    language: '',
    userData: null,
    scriptUrl: '',
    lastInitialized: null,
    error: null,
  });

  const getScriptUrl = (selectedWorkspace?: string, customUrl?: string) => {
    if (selectedWorkspace === 'custom-dev' && customUrl) {
      const url = customUrl.endsWith('/') ? customUrl.slice(0, -1) : customUrl;
      return `${url}/static/script.js`;
    }
    if (selectedWorkspace?.startsWith('pr')) {
      return `https://my-${selectedWorkspace}.ohio.pf.dev/static/script.js`;
    }
    return 'https://app.productfruits.com/static/script.js';
  };

  const getLanguageCode = (): string => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'cs', 'fr', 'ar', 'pt'].includes(savedLanguage)) {
      return savedLanguage;
    }
    return 'en';
  };

  const destroyProductFruits = async () => {
    console.log(`[ProductFruits] Destroying existing instance...`);
    const existingPF = (window as any).$productFruits;
    if (existingPF && typeof existingPF.push === 'function') {
      try {
        existingPF.push(['destroy']);
        console.log('[ProductFruits] Destroyed via push');
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (e) {
        console.log('[ProductFruits] Destroy failed:', e);
      }
    }
    
    delete (window as any).$productFruits;
    delete (window as any).productFruits;
    delete (window as any).productFruitsInit;
    delete (window as any).productFruitsInit2;
    delete (window as any).productFruitsUser;
    delete (window as any).productFruitsReady;

    const existingScripts = document.querySelectorAll('script[src*="productfruits"], script[src*="pf.dev"], script[data-productfruits-init]');
    existingScripts.forEach(script => script.remove());
    console.log(`[ProductFruits] Removed ${existingScripts.length} scripts`);
    
    await new Promise(resolve => setTimeout(resolve, 200));
  };

  const initializeProductFruits = useCallback(async (workspaceData?: any, forceReinit = false) => {
    if (isInitializing.current) {
      console.log('[ProductFruits] Initialization already in progress, skipping');
      return;
    }
    
    console.log(`[ProductFruits] Starting initialization (forceReinit: ${forceReinit})`);
    isInitializing.current = true;
    setState(prev => ({ ...prev, status: 'loading', error: null }));

    let dataToUse = workspaceData;
    
    if (!dataToUse) {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          dataToUse = JSON.parse(savedData);
        }
      } catch (error) {
        console.error('[ProductFruits] Error loading workspace data:', error);
        isInitializing.current = false;
        setState(prev => ({ ...prev, status: 'error', error: 'Failed to load workspace data' }));
        return;
      }
    }

    if (!dataToUse || !dataToUse.workspaceCode || !dataToUse.username) {
      console.log('[ProductFruits] Missing required workspace data');
      isInitializing.current = false;
      setState(prev => ({ ...prev, status: 'error', error: 'Missing workspace code or username' }));
      return;
    }

    const languageCode = getLanguageCode();
    await destroyProductFruits();

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

    (window as any).productFruitsReady = function() {
      console.log('[ProductFruits] Ready callback fired!');
      
      setTimeout(() => {
        const launcher = document.getElementById('newsfeed-launcher');
        if (launcher && (window as any).productFruits?.api?.announcementsV2) {
          (window as any).productFruits.api.announcementsV2.attachNewsWidgetToElement(launcher);
          console.log('[ProductFruits] Newsfeed widget auto-attached');
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

    const mainScript = document.createElement('script');
    mainScript.async = true;
    const scriptUrl = getScriptUrl(dataToUse.selectedWorkspace, dataToUse.customUrl);
    mainScript.src = `${scriptUrl}?c=${dataToUse.workspaceCode}&t=${Date.now()}`;
    console.log(`[ProductFruits] Loading script: ${mainScript.src}`);

    setState(prev => ({
      ...prev,
      workspaceCode: dataToUse.workspaceCode,
      language: languageCode,
      userData: initData,
      scriptUrl: scriptUrl,
    }));
    
    mainScript.onload = () => {
      const initScript = document.createElement('script');
      initScript.type = 'text/javascript';
      initScript.setAttribute('data-productfruits-init', 'true');
      initScript.innerHTML = `
        window.$productFruits = window.$productFruits || [];
        window.$productFruits.push(['init', '${dataToUse.workspaceCode}', '${languageCode}', ${JSON.stringify(initData)}]);
      `;
      document.head.appendChild(initScript);
      console.log(`[ProductFruits] Init command pushed - workspace: ${dataToUse.workspaceCode}, lang: ${languageCode}`);
      
      currentLanguage.current = languageCode;
    };

    mainScript.onerror = () => {
      console.error('[ProductFruits] Failed to load script');
      isInitializing.current = false;
      setState(prev => ({
        ...prev,
        status: 'error',
        error: 'Failed to load ProductFruits script',
      }));
    };
    
    document.head.appendChild(mainScript);
    initializedWorkspaceCode.current = dataToUse.workspaceCode;
  }, []);

  const reinitializeWithLanguage = useCallback(async () => {
    const newLanguage = getLanguageCode();
    
    if (currentLanguage.current === newLanguage && currentLanguage.current !== '') {
      console.log('[ProductFruits] Language unchanged, skipping reinit');
      return;
    }
    
    console.log(`[ProductFruits] Language changed: "${currentLanguage.current}" -> "${newLanguage}"`);
    hasInitialized.current = false;
    await initializeProductFruits(undefined, true);
  }, [initializeProductFruits]);

  const hasWorkspaceCodeChanged = (currentWorkspaceCode: string) => {
    return hasInitialized.current && 
           currentWorkspaceCode !== initializedWorkspaceCode.current &&
           currentWorkspaceCode !== '';
  };

  const resetProductFruitsState = useCallback(() => {
    console.log('[ProductFruits] Resetting state');
    hasInitialized.current = false;
    isInitializing.current = false;
    currentLanguage.current = '';
    initializedWorkspaceCode.current = '';
    setState({
      status: 'idle',
      workspaceCode: '',
      language: '',
      userData: null,
      scriptUrl: '',
      lastInitialized: null,
      error: null,
    });
  }, []);

  const initializeFromStorage = useCallback(() => {
    if (hasInitialized.current || isInitializing.current) {
      console.log('[ProductFruits] Already initialized or initializing, skipping');
      return;
    }
    
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const workspaceData = JSON.parse(savedData);
        
        if (workspaceData.workspaceCode && workspaceData.username) {
          console.log('[ProductFruits] Auto-initializing from storage');
          hasInitialized.current = true;
          initializeProductFruits(workspaceData);
          initializedWorkspaceCode.current = workspaceData.workspaceCode;
        }
      }
    } catch (error) {
      console.error('[ProductFruits] Error loading from localStorage:', error);
    }
  }, [initializeProductFruits]);

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard') && !hasInitialized.current) {
      console.log('[ProductFruits] On dashboard page, attempting auto-init');
      initializeFromStorage();
    }
  }, [location.pathname, initializeFromStorage]);

  const canAutoInitialize = location.pathname.startsWith('/dashboard');

  return (
    <ProductFruitsContext.Provider value={{
      state,
      initializeProductFruits,
      reinitializeWithLanguage,
      hasWorkspaceCodeChanged,
      canAutoInitialize,
      resetProductFruitsState,
    }}>
      {children}
    </ProductFruitsContext.Provider>
  );
};

export const useProductFruits = () => {
  const instanceId = useRef(`hook-${++hookInstanceCounter}-${Math.random().toString(36).substring(7)}`);
  
  useEffect(() => {
    console.log(`[ProductFruits] Hook instance ${instanceId.current} created`);
    return () => {
      console.log(`[ProductFruits] Hook instance ${instanceId.current} unmounted`);
    };
  }, []);

  const context = useContext(ProductFruitsContext);
  if (!context) {
    throw new Error('useProductFruits must be used within ProductFruitsProvider');
  }
  return context;
};