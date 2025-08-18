import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
}

interface HorizontalStepperProps {
  steps: Step[];
  currentStep: number;
}

const getStatusIcon = (status: Step["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-5 w-5 text-success" />;
    case "in-progress":
      return <Clock className="h-5 w-5 text-warning animate-pulse" />;
    case "pending":
      return <AlertCircle className="h-5 w-5 text-pending" />;
  }
};

const getStatusColor = (status: Step["status"], isActive: boolean) => {
  if (isActive) {
    switch (status) {
      case "completed":
        return "border-success bg-success/10";
      case "in-progress":
        return "border-warning bg-warning/10 animate-pulse-glow";
      case "pending":
        return "border-pending bg-pending/10";
    }
  }
  return "border-muted bg-muted/50";
};

export const HorizontalStepper = ({ steps, currentStep }: HorizontalStepperProps) => {
  return (
    <div className="bg-card shadow-card rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Processing Steps</h2>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                getStatusColor(step.status, index === currentStep),
                index === currentStep && "animate-slide-in"
              )}
            >
              {getStatusIcon(step.status)}
            </div>
            <div className="ml-3 flex-1">
              <p className={cn(
                "font-medium text-sm",
                index === currentStep ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.title}
              </p>
              <p className={cn(
                "text-xs capitalize",
                step.status === "completed" && "text-success",
                step.status === "in-progress" && "text-warning",
                step.status === "pending" && "text-pending"
              )}>
                {step.status.replace("-", " ")}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "h-0.5 w-16 mx-4 transition-all duration-500",
                step.status === "completed" ? "bg-success" : "bg-border"
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};