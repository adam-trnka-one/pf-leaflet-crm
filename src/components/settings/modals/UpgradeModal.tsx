
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIntegration: string;
}

export const UpgradeModal = ({ isOpen, onClose, selectedIntegration }: UpgradeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-testid="upgrade-modal">
      <DialogContent className="sm:max-w-[500px]" data-testid="upgrade-modal-content">
        <DialogHeader data-testid="upgrade-modal-header">
          <DialogTitle className="flex items-center space-x-2" data-testid="upgrade-modal-title">
            <Crown className="h-5 w-5 text-amber-500" data-testid="upgrade-crown-icon" />
            <span data-testid="upgrade-title-text">Upgrade to Premium</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4" data-testid="upgrade-modal-body">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200" data-testid="integration-info">
            <h4 className="font-semibold text-slate-800 mb-2" data-testid="integration-name">{selectedIntegration} Integration</h4>
            <p className="text-sm text-slate-600" data-testid="integration-description">
              Connect with {selectedIntegration} to unlock powerful automation and sync your data seamlessly across platforms.
            </p>
          </div>
          <div className="space-y-3" data-testid="features-section">
            <h5 className="font-medium text-slate-800" data-testid="features-title">Premium features include:</h5>
            <ul className="space-y-2 text-sm text-slate-600" data-testid="features-list">
              <li className="flex items-center space-x-2" data-testid="sync-feature">
                <div className="w-2 h-2 bg-blue-500 rounded-full" data-testid="sync-bullet"></div>
                <span data-testid="sync-text">Real-time data synchronization</span>
              </li>
              <li className="flex items-center space-x-2" data-testid="automation-feature">
                <div className="w-2 h-2 bg-blue-500 rounded-full" data-testid="automation-bullet"></div>
                <span data-testid="automation-text">Advanced automation workflows</span>
              </li>
              <li className="flex items-center space-x-2" data-testid="support-feature">
                <div className="w-2 h-2 bg-blue-500 rounded-full" data-testid="support-bullet"></div>
                <span data-testid="support-text">Priority customer support</span>
              </li>
              <li className="flex items-center space-x-2" data-testid="mapping-feature">
                <div className="w-2 h-2 bg-blue-500 rounded-full" data-testid="mapping-bullet"></div>
                <span data-testid="mapping-text">Custom field mapping</span>
              </li>
            </ul>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2" data-testid="upgrade-modal-footer">
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full sm:w-auto"
            onClick={onClose}
            data-testid="upgrade-now-button"
          >
            <Crown className="h-4 w-4 mr-2" data-testid="upgrade-now-icon" />
            <span data-testid="upgrade-now-text">Upgrade Now</span>
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto" data-testid="maybe-later-button">
            <span data-testid="maybe-later-text">Maybe Later</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
