
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";

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
    <Card className="bg-white shadow-sm h-full" data-testid="checklist-card">
      <CardHeader data-testid="checklist-header">
        <CardTitle className="flex items-center space-x-2" data-testid="checklist-title">
          <CheckSquare className="h-5 w-5" data-testid="checklist-icon" />
          <span data-testid="checklist-title-text">Getting Started</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6" data-testid="checklist-content">
        <div 
          ref={checklistRef} 
          id="productfruits-checklist-container"
          className="min-h-[600px] max-h-none overflow-visible"
          data-testid="checklist-container"
        >
          <p className="text-slate-600 text-sm">Loading checklist...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistSection;
