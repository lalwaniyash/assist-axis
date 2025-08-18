import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SubStep {
  id: string;
  title: string;
  description?: string;
  status: "completed" | "in-progress" | "pending";
}

interface VerticalStepperProps {
  title: string;
  subSteps: SubStep[];
}

const getStatusIcon = (status: SubStep["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-warning animate-pulse" />;
    case "pending":
      return <AlertCircle className="h-4 w-4 text-pending" />;
  }
};

export const VerticalStepper = ({ title, subSteps }: VerticalStepperProps) => {
  return (
    <div className="bg-card shadow-card rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title} - Detailed Steps</h3>
      <div className="space-y-4">
        {subSteps.map((subStep, index) => (
          <div
            key={subStep.id}
            className={cn(
              "flex items-start space-x-3 p-3 rounded-md transition-all duration-300",
              subStep.status === "in-progress" && "bg-warning/10 border border-warning/20 animate-slide-in",
              subStep.status === "completed" && "bg-success/10 border border-success/20",
              subStep.status === "pending" && "bg-muted/50"
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getStatusIcon(subStep.status)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-sm font-medium",
                subStep.status === "completed" && "text-success",
                subStep.status === "in-progress" && "text-warning",
                subStep.status === "pending" && "text-muted-foreground"
              )}>
                {subStep.title}
              </p>
              {subStep.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {subStep.description}
                </p>
              )}
            </div>
            <div className="flex-shrink-0">
              <span className={cn(
                "text-xs px-2 py-1 rounded-full capitalize",
                subStep.status === "completed" && "bg-success/20 text-success",
                subStep.status === "in-progress" && "bg-warning/20 text-warning",
                subStep.status === "pending" && "bg-pending/20 text-pending"
              )}>
                {subStep.status.replace("-", " ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};