
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
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://app.productfruits.com/widget';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load ProductFruits script'));
        document.head.appendChild(script);
      });
    };

    const initializeProductFruits = () => {
      // Initialize the ProductFruits queue if it doesn't exist
      if (!window.$productFruits) {
        window.$productFruits = [];
      }
    };

    const injectChecklist = () => {
      const maxRetries = 10;
      let retryCount = 0;

      const attemptInject = () => {
        if (checklistRef.current && window.productFruits?.api?.checklists) {
          const checklistId = 8950;
          try {
            window.productFruits.api.checklists.injectToElement(checklistId, checklistRef.current);
            console.log('ProductFruits checklist injected with ID:', checklistId);
            setIsLoading(false);
            setError(null);
          } catch (error) {
            console.error('Error injecting ProductFruits checklist:', error);
            setError('Failed to load checklist');
            setIsLoading(false);
          }
        } else if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(attemptInject, 500);
        } else {
          setError('ProductFruits checklist could not be loaded');
          setIsLoading(false);
        }
      };

      attemptInject();
    };

    const initialize = async () => {
      try {
        await loadProductFruitsScript();
        initializeProductFruits();
        // Wait a bit for the API to be available
        setTimeout(injectChecklist, 1000);
      } catch (error) {
        console.error('Failed to initialize ProductFruits:', error);
        setError('Failed to initialize checklist service');
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
