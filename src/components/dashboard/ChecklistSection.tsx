
import { useEffect, useRef, useState } from 'react';

interface ChecklistSectionProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

const ChecklistSection = ({ onVisibilityChange }: ChecklistSectionProps) => {
  const checklistRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hasBeenInjected, setHasBeenInjected] = useState(false);

  useEffect(() => {
    const injectChecklist = () => {
      if (checklistRef.current && window.productFruits?.api?.checklists) {
        const checklistId = 8950;
        try {
          window.productFruits.api.checklists.injectToElement(checklistId, checklistRef.current);
          console.log('ProductFruits checklist injected with ID:', checklistId);
          setHasBeenInjected(true);
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

  useEffect(() => {
    const checkForChecklist = () => {
      if (checklistRef.current && hasBeenInjected) {
        // Only check for visibility after content has been injected
        const hasChecklistPanel = checklistRef.current.querySelector('[class*="productfruits"]') || 
                                  checklistRef.current.querySelector('.productfruits--checklist-panel') ||
                                  checklistRef.current.querySelector('.productfruits--checklist-panel-embedded') ||
                                  checklistRef.current.innerHTML.includes('productfruits');
        
        const newVisibility = !!hasChecklistPanel;
        console.log('Checklist visibility check:', { 
          hasChecklistPanel: !!hasChecklistPanel, 
          hasBeenInjected, 
          innerHTML: checklistRef.current.innerHTML.substring(0, 200) 
        });
        
        // Only update visibility if content was previously injected and now missing
        if (!newVisibility && hasBeenInjected) {
          setIsVisible(false);
          onVisibilityChange?.(false);
        } else if (newVisibility) {
          setIsVisible(true);
          onVisibilityChange?.(true);
        }
      }
    };

    if (hasBeenInjected) {
      // Only start monitoring after injection
      const initialCheck = setTimeout(checkForChecklist, 1000);
      
      // Set up observer to monitor DOM changes
      const observer = new MutationObserver(() => {
        setTimeout(checkForChecklist, 100);
      });
      
      if (checklistRef.current) {
        observer.observe(checklistRef.current, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class']
        });
      }

      return () => {
        clearTimeout(initialCheck);
        observer.disconnect();
      };
    }
  }, [onVisibilityChange, hasBeenInjected]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      ref={checklistRef} 
      id="productfruits-checklist-container"
      className="min-h-[600px] w-full bg-white shadow-sm border border-slate-200 rounded-lg p-6"
      data-testid="checklist-container"
    >
    </div>
  );
};

export default ChecklistSection;
