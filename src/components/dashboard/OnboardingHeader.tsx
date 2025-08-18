import { Button } from "@/components/ui/button";
import { Pause } from "lucide-react";

interface OnboardingHeaderProps {
  customerName: string;
  onHold: () => void;
}

export const OnboardingHeader = ({ customerName, onHold }: OnboardingHeaderProps) => {
  return (
    <header className="bg-card shadow-card rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customer Onboarding</h1>
          <p className="text-muted-foreground mt-1">
            Processing application for <span className="font-semibold text-primary">{customerName}</span>
          </p>
        </div>
        <Button variant="hold" onClick={onHold} className="gap-2">
          <Pause className="h-4 w-4" />
          Put On Hold
        </Button>
      </div>
    </header>
  );
};