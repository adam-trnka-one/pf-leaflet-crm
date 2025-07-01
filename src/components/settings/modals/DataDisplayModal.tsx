
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface DataDisplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  displayData: string;
}

export const DataDisplayModal = ({ isOpen, onClose, displayData }: DataDisplayModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>ProductFruits Script Format</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Here's your workspace data formatted for the ProductFruits script:
          </p>
          <Textarea
            value={displayData}
            readOnly
            className="min-h-[200px] font-mono text-sm"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(displayData);
              toast({
                title: "Copied to clipboard",
                description: "The script has been copied to your clipboard."
              });
            }}
          >
            Copy to Clipboard
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
