import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";

interface HumanVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  title: string;
  message: string;
}

export const HumanVerificationModal = ({ 
  isOpen, 
  onClose, 
  onApprove, 
  title, 
  message 
}: HumanVerificationModalProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleConfirm = () => {
    if (isChecked) {
      onApprove();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-6 py-4">
          <div className="text-center space-y-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            
            <div className="flex items-center justify-center space-x-2 p-3 bg-warning/10 rounded-lg border border-warning/20">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span className="text-sm text-warning">{message}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="verification-check"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked === true)}
            />
            <label 
              htmlFor="verification-check" 
              className="text-sm text-muted-foreground cursor-pointer"
            >
              I have reviewed and approved
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!isChecked}
              className="bg-primary hover:bg-primary/90"
            >
              Confirm & Proceed
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};