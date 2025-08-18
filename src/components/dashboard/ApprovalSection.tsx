import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface ApprovalSectionProps {
  requiresApproval: boolean;
  onApprove: () => void;
  onReject: () => void;
}

export const ApprovalSection = ({ requiresApproval, onApprove, onReject }: ApprovalSectionProps) => {
  if (!requiresApproval) return null;

  return (
    <div className="bg-card shadow-card rounded-lg p-6 mb-6 border border-warning/20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-warning" />
            Human Approval Required
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            This application requires manual review before proceeding to the next step.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="destructive"
            onClick={onReject}
            className="gap-2"
          >
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          <Button
            variant="approval"
            onClick={onApprove}
            className="gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Approve & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};