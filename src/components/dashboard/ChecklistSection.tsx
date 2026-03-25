
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ChecklistSection = () => {
  const checklistRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20; // 10 seconds max

    const injectChecklist = () => {
      if (checklistRef.current && window.productFruits?.api?.checklists) {
        const checklistId = 8950;
        try {
          window.productFruits.api.checklists.injectToElement(checklistId, checklistRef.current);
          console.log('ProductFruits checklist injected with ID:', checklistId);
          setIsLoading(false);
        } catch (error) {
          console.error('Error injecting ProductFruits checklist:', error);
          setIsLoading(false);
        }
        return;
      }

      attempts++;
      if (attempts < maxAttempts) {
        timer = setTimeout(injectChecklist, 500);
      } else {
        setIsLoading(false);
      }
    };

    let timer: ReturnType<typeof setTimeout>;

    if (window.productFruits?.api?.checklists) {
      injectChecklist();
    } else {
      timer = setTimeout(injectChecklist, 500);
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={checklistRef} 
      id="productfruits-checklist-container"
      className="min-h-[600px] w-full bg-white shadow-sm border border-slate-200 rounded-lg p-6 relative"
      data-testid="checklist-container"
    >
      {isLoading && (
        <div className="space-y-4" data-testid="checklist-skeleton">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-3 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistSection;
