import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, AlertCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComplianceResultsViewProps {
  onBack: () => void;
  onProceed: () => void;
}

const steps = [
  { id: "ocr", title: "OCR Processing", status: "completed" },
  { id: "human-approval", title: "Human Approval", status: "completed" },
  { id: "compliance", title: "Compliance and AML Verification", status: "completed" },
  { id: "final-approval", title: "Final Review", status: "pending" },
  { id: "account", title: "Account Creation", status: "pending" }
];

const complianceResults = [
  {
    id: "kyc",
    title: "KYC (Know Your Customer)",
    description: "Verification of customer identity using official documents and biometric data. Ensures the customer is not a high risk to the business.",
    status: "pass",
    details: "All identity documents verified successfully"
  },
  {
    id: "sanctions",
    title: "Sanctions Screening", 
    description: "Screening against global sanctions lists, Politically Exposed Persons (PEPs), and adverse media to identify potential risks.",
    status: "pass",
    details: "No matches found in sanctions databases"
  },
  {
    id: "transaction",
    title: "Transaction Monitoring",
    description: "Analysis of expected transaction patterns to detect any flag any unusual or suspicious activities.",
    status: "fail",
    details: "Unusual transaction patterns detected. Further investigation is needed. Please review the detailed report for specific alerts.",
    alert: "Action Required: Unusual transaction patterns detected. Further investigation is needed. Please review the detailed report for specific alerts."
  }
];

export const ComplianceResultsView = ({ onBack, onProceed }: ComplianceResultsViewProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pass":
        return <Badge className="bg-success/10 text-success border-success/20">Pass</Badge>;
      case "fail":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Fail</Badge>;
      default:
        return <Badge className="bg-warning/10 text-warning border-warning/20">Needs Review</Badge>;
    }
  };

  const getStepIcon = (status: string, index: number) => {
    if (status === "completed") {
      return <CheckCircle className="h-6 w-6 text-success" />;
    } else if (status === "in-progress") {
      return <Clock className="h-6 w-6 text-warning animate-pulse" />;
    }
    return (
      <div className="w-6 h-6 rounded-full border-2 border-muted flex items-center justify-center">
        <span className="text-sm font-medium text-muted-foreground">{index + 1}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">HARVIS Bank</h1>
              <p className="text-sm text-muted-foreground">APP-2025-4716</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Progress</CardTitle>
            <p className="text-sm text-muted-foreground">Follow the status of your application in real-time.</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full transition-all",
                    step.status === "completed" ? "bg-success text-success-foreground" :
                    step.status === "in-progress" ? "bg-warning text-warning-foreground" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {getStepIcon(step.status, index)}
                  </div>
                  <span className="text-sm font-medium text-center">{step.title}</span>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-16 h-1 mx-4",
                      step.status === "completed" ? "bg-success" : "bg-muted"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Results */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance & AML Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceResults.map((result) => (
              <div key={result.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{result.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(result.status)}
                    <Button variant="ghost" size="sm" className="text-primary">
                      View Report
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{result.details}</p>
                
                {result.alert && (
                  <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-destructive">{result.alert}</p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            onClick={onProceed}
            className="bg-primary hover:bg-primary/90"
          >
            Proceed to Final Review
            <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
};