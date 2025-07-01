
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
    <Dialog open={isOpen} onOpenChange={onClose} data-settings="data-display-modal">
      <DialogContent className="sm:max-w-[600px]" data-settings="data-display-modal-content">
        <DialogHeader data-settings="data-display-modal-header">
          <DialogTitle data-settings="data-display-modal-title">ProductFruits Script Format</DialogTitle>
        </DialogHeader>
        <div className="space-y-4" data-settings="data-display-modal-body">
          <p className="text-sm text-slate-600" data-settings="data-display-description">
            Here's your workspace data formatted for the ProductFruits script:
          </p>
          <Textarea
            value={displayData}
            readOnly
            className="min-h-[200px] font-mono text-sm"
            data-settings="data-display-textarea"
          />
        </div>
        <DialogFooter data-settings="data-display-modal-footer">
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(displayData);
              toast({
                title: "Copied to clipboard",
                description: "The script has been copied to your clipboard."
              });
            }}
            data-settings="copy-button"
          >
            <span data-settings="copy-button-text">Copy to Clipboard</span>
          </Button>
          <Button onClick={onClose} data-settings="close-button">
            <span data-settings="close-button-text">Close</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
