import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, CreditCard, Landmark } from "lucide-react";
import { useState } from "react";

interface AccountDetails {
  accountNumber: string;
  routingNumber: string;
  customerId: string;
  branchCode: string;
}

interface AccountCreationViewProps {
  accountDetails: AccountDetails;
  onAccountTypeSelect: (type: string) => void;
  onComplete: () => void;
}

export const AccountCreationView = ({ accountDetails, onAccountTypeSelect, onComplete }: AccountCreationViewProps) => {
  const [selectedAccountType, setSelectedAccountType] = useState<string>("savings");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConfirmAccount = () => {
    onAccountTypeSelect(selectedAccountType);
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    onComplete();
  };

  return (
    <>
      <Card className="shadow-card border border-success/20 bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <Landmark className="h-6 w-6" />
            Account Creation Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Account Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-success/10 border border-success/20">
            <div className="space-y-3">
              <div>
                <span className="text-xs text-muted-foreground">Account Number</span>
                <p className="font-mono font-bold text-lg">{accountDetails.accountNumber}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Customer ID</span>
                <p className="font-mono font-semibold">{accountDetails.customerId}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-muted-foreground">Routing Number</span>
                <p className="font-mono font-semibold">{accountDetails.routingNumber}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Branch Code</span>
                <p className="font-mono font-semibold">{accountDetails.branchCode}</p>
              </div>
            </div>
          </div>

          {/* Account Type Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Select Account Type</h3>
            </div>
            
            <RadioGroup 
              value={selectedAccountType} 
              onValueChange={setSelectedAccountType}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <RadioGroupItem value="savings" id="savings" />
                <Label htmlFor="savings" className="flex-1 cursor-pointer">
                  <div>
                    <p className="font-medium">Savings Account</p>
                    <p className="text-sm text-muted-foreground">
                      Earn interest on your deposits with flexible access to funds
                    </p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <RadioGroupItem value="current" id="current" />
                <Label htmlFor="current" className="flex-1 cursor-pointer">
                  <div>
                    <p className="font-medium">Current Account</p>
                    <p className="text-sm text-muted-foreground">
                      Perfect for daily transactions with unlimited deposits and withdrawals
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Confirm Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button 
              onClick={handleConfirmAccount}
              variant="approval" 
              size="lg"
              className="gap-2"
            >
              <CheckCircle className="h-5 w-5" />
              Confirm Account Setup
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-success-foreground" />
            </div>
            <DialogTitle className="text-xl text-center">
              Account Created Successfully!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Your {selectedAccountType} account has been created and is now active.
            </p>
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <p className="font-mono font-bold text-lg">{accountDetails.accountNumber}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {selectedAccountType} Account
              </p>
            </div>
            <Button 
              onClick={handleCloseModal} 
              className="w-full" 
              variant="approval"
            >
              Continue to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};