
import { useEffect, useRef, useState } from 'react';

const ChecklistSection = () => {
  const checklistRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load ProductFruits script if not already loaded
    const loadProductFruitsScript = () => {
      return new Promise<void>((resolve, reject) => {
        // Check if script already exists
        if (document.querySelector('script[src*="productfruits.com"]')) {
          console.log('ProductFruits script already loaded');
          resolve();
          return;
        }

        console.log('Loading ProductFruits script...');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://app.productfruits.com/widget';
        script.onload = () => {
          console.log('ProductFruits script loaded successfully');
          resolve();
        };
        script.onerror = () => {
          console.error('Failed to load ProductFruits script');
          reject(new Error('Failed to load ProductFruits script'));
        };
        document.head.appendChild(script);
      });
    };

    const initializeProductFruits = () => {
      // Initialize the ProductFruits queue if it doesn't exist
      if (!window.$productFruits) {
        window.$productFruits = [];
        console.log('ProductFruits queue initialized');
      }
    };

    const waitForProductFruitsAPI = () => {
      return new Promise<void>((resolve, reject) => {
        const maxWaitTime = 15000; // 15 seconds
        const checkInterval = 200; // Check every 200ms
        let elapsed = 0;

        const checkAPI = () => {
          console.log('Checking for ProductFruits API...', {
            productFruits: !!window.productFruits,
            api: !!window.productFruits?.api,
            checklists: !!window.productFruits?.api?.checklists
          });

          if (window.productFruits?.api?.checklists) {
            console.log('ProductFruits API is ready!');
            resolve();
            return;
          }

          elapsed += checkInterval;
          if (elapsed >= maxWaitTime) {
            console.error('ProductFruits API not available after waiting');
            reject(new Error('ProductFruits API not available'));
            return;
          }

          setTimeout(checkAPI, checkInterval);
        };

        checkAPI();
      });
    };

    const injectChecklist = () => {
      if (!checklistRef.current) {
        console.error('Checklist container element not found');
        setError('Container element not available');
        setIsLoading(false);
        return;
      }

      const checklistId = 8950;
      console.log('Attempting to inject checklist with ID:', checklistId);

      try {
        // Verify the API is still available
        if (!window.productFruits?.api?.checklists) {
          throw new Error('ProductFruits API not available at injection time');
        }

        window.productFruits.api.checklists.injectToElement(checklistId, checklistRef.current);
        console.log('ProductFruits checklist injected successfully with ID:', checklistId);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error injecting ProductFruits checklist:', error);
        setError(`Failed to inject checklist: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setIsLoading(false);
      }
    };

    const initialize = async () => {
      try {
        console.log('Starting ProductFruits initialization...');
        await loadProductFruitsScript();
        initializeProductFruits();
        await waitForProductFruitsAPI();
        injectChecklist();
      } catch (error) {
        console.error('Failed to initialize ProductFruits:', error);
        setError(`Failed to initialize checklist service: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  if (error) {
    return (
      <div className="min-h-[600px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-center text-gray-500">
          <p className="mb-2">Checklist unavailable</p>
          <p className="text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 text-sm bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading checklist...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={checklistRef} 
      id="productfruits-checklist-container"
      className="min-h-[600px] max-h-none overflow-visible w-full max-w-full"
      data-testid="checklist-container"
    >
    </div>
  );
};

export default ChecklistSection;
