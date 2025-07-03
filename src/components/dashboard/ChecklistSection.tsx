
import { useEffect, useRef } from 'react';

const ChecklistSection = () => {
  const checklistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const injectChecklist = () => {
      if (checklistRef.current && window.productFruits?.api?.checklists) {
        const checklistId = 8950;
        try {
          window.productFruits.api.checklists.injectToElement(checklistId, checklistRef.current);
          console.log('ProductFruits checklist injected with ID:', checklistId);
        } catch (error) {
          console.error('Error injecting ProductFruits checklist:', error);
        }
      }
    };

    // Try to inject immediately if productFruits is available
    if (window.productFruits?.api?.checklists) {
      injectChecklist();
    } else {
      // If not available, wait a bit and try again
      const timer = setTimeout(injectChecklist, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

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
