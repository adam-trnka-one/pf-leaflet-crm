
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
    let hasDetectedChecklist = false;

    const checkForSpecificClasses = () => {
      if (checklistRef.current) {
        const hasTargetClasses = checklistRef.current.querySelector('.productfruits--checklist-panel.productfruits--checklist-panel-embedded') ||
                                 (checklistRef.current.querySelector('.productfruits--checklist-panel') && 
                                  checklistRef.current.querySelector('.productfruits--checklist-panel-embedded'));
        
        // Only notify of availability, don't keep checking for removal
        if (hasTargetClasses && !hasDetectedChecklist) {
          hasDetectedChecklist = true;
          onVisibilityChange?.(true);
        } else if (!hasTargetClasses && !hasDetectedChecklist) {
          onVisibilityChange?.(false);
        }
      }
    };

    // Initial check after delay to allow injection
    const timer = setTimeout(checkForSpecificClasses, 2000);
    
    // Only observe for initial detection, not continuous monitoring
    const observer = new MutationObserver((mutations) => {
      // Only check if we haven't detected the checklist yet
      if (!hasDetectedChecklist) {
        // Debounce the check to avoid too many calls
        setTimeout(checkForSpecificClasses, 500);
      }
    });
    
    if (checklistRef.current) {
      observer.observe(checklistRef.current, {
        childList: true,
        subtree: true
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
