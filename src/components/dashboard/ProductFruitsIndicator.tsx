import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { ProductFruitsStatus } from "@/hooks/useProductFruits";
import { useEffect, useState } from "react";

interface ProductFruitsIndicatorProps {
  status: ProductFruitsStatus;
}

export const ProductFruitsIndicator = ({ status }: ProductFruitsIndicatorProps) => {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (status === 'loading' || status === 'initialized' || status === 'error') {
      setVisible(true);
      setFadeOut(false);
      
      // Auto-hide after 3 seconds for success state
      if (status === 'initialized') {
        const timer = setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => setVisible(false), 300);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [status]);

  if (!visible) return null;

  const getContent = () => {
    switch (status) {
      case 'loading':
        return (
          <Badge variant="outline" className="gap-1.5 border-amber-400 bg-amber-50 text-amber-700 shadow-sm">
            <Loader2 className="h-3 w-3 animate-spin" />
            Loading ProductFruits...
          </Badge>
        );
      case 'initialized':
        return (
          <Badge variant="outline" className="gap-1.5 border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm">
            <CheckCircle2 className="h-3 w-3" />
            ProductFruits Ready
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="outline" className="gap-1.5 border-red-400 bg-red-50 text-red-700 shadow-sm">
            <AlertCircle className="h-3 w-3" />
            ProductFruits Error
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {getContent()}
    </div>
  );
};
