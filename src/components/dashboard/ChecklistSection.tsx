
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";

const ChecklistSection = () => {
  const checklistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const injectChecklist = () => {
      if (checklistRef.current && (window as any).productFruits?.api?.checklists) {
        const checklistId = 8950;
        try {
          (window as any).productFruits.api.checklists.injectToElement(checklistId, checklistRef.current);
          console.log('ProductFruits checklist injected with ID:', checklistId);
        } catch (error) {
          console.error('Error injecting ProductFruits checklist:', error);
        }
      }
    };

    // Try to inject immediately if ProductFruits is already loaded
    injectChecklist();

    // Also try after a short delay in case ProductFruits is still loading
    const timer = setTimeout(injectChecklist, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="bg-white shadow-sm" data-testid="checklist-section">
      <CardHeader data-testid="checklist-header">
        <CardTitle className="flex items-center space-x-2" data-testid="checklist-title">
          <CheckSquare className="h-5 w-5" data-testid="checklist-icon" />
          <span data-testid="checklist-title-text">Getting Started Checklist</span>
        </CardTitle>
      </CardHeader>
      <CardContent data-testid="checklist-content">
        <div 
          ref={checklistRef} 
          id="productfruits-checklist-container"
          className="min-h-[100px] max-h-[400px] overflow-hidden"
          data-testid="checklist-container"
        >
          {/* ProductFruits checklist will be injected here */}
          <p className="text-slate-500 text-sm">Loading checklist...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistSection;
