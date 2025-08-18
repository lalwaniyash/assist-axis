import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percentage: number;
  status: "in-progress" | "completed" | "on-hold";
}

export const ProgressBar = ({ percentage, status }: ProgressBarProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "text-success";
      case "in-progress":
        return "text-warning";
      case "on-hold":
        return "text-destructive";
    }
  };

  const getProgressColor = () => {
    switch (status) {
      case "completed":
        return "bg-gradient-success";
      case "in-progress":
        return "bg-gradient-warning";
      case "on-hold":
        return "bg-destructive";
    }
  };

  return (
    <div className="bg-card shadow-card rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-foreground">Overall Progress</h3>
        <span className={cn("text-xl font-bold", getStatusColor())}>
          {percentage}%
        </span>
      </div>
      <div className="relative">
        <Progress 
          value={percentage} 
          className={cn(
            "h-3 transition-all duration-500",
            status === "in-progress" && "animate-pulse-glow"
          )}
        />
        <div 
          className={cn(
            "absolute top-0 left-0 h-3 rounded-full transition-all duration-500",
            getProgressColor()
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2 capitalize">
        Status: <span className={cn("font-medium", getStatusColor())}>
          {status.replace("-", " ")}
        </span>
      </p>
    </div>
  );
};