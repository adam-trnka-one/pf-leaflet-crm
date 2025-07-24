
import { useEffect, useRef, useState } from 'react';

interface ChecklistSectionProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

const ChecklistSection = ({ onVisibilityChange }: ChecklistSectionProps) => {
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

  useEffect(() => {
    const checkForSpecificClasses = () => {
      if (checklistRef.current) {
        const hasTargetClasses = checklistRef.current.querySelector('.productfruits--checklist-panel.productfruits--checklist-panel-embedded') ||
                                 (checklistRef.current.querySelector('.productfruits--checklist-panel') && 
                                  checklistRef.current.querySelector('.productfruits--checklist-panel-embedded'));
        
        onVisibilityChange?.(!!hasTargetClasses);
      }
    };

    // Check after a delay to allow injection
    const timer = setTimeout(checkForSpecificClasses, 2000);
    
    // Set up observer to monitor DOM changes
    const observer = new MutationObserver(() => {
      setTimeout(checkForSpecificClasses, 200);
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
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [onVisibilityChange]);

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
