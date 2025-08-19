import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AccountTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AccountTypeModal = ({ isOpen, onClose, onConfirm }: AccountTypeModalProps) => {
  const [selectedType, setSelectedType] = useState("savings");

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-6 py-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Select Account Type</h2>
          </div>

          <RadioGroup value={selectedType} onValueChange={setSelectedType} className="space-y-4">
            <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="savings" id="savings" />
              <Label htmlFor="savings" className="flex-1 cursor-pointer">
                Savings Account
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="current" id="current" />
              <Label htmlFor="current" className="flex-1 cursor-pointer">
                Current Account
              </Label>
            </div>
          </RadioGroup>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
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