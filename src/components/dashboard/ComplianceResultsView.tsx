import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Shield, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComplianceData {
  kycStatus: "passed" | "failed" | "warning";
  sanctionsCheck: "clear" | "flagged" | "under_review";
  pepCheck: "clear" | "flagged" | "under_review";
  riskScore: number;
  complianceNotes: string[];
}

interface AMLData {
  riskRating: "low" | "medium" | "high";
  transactionPatterns: "normal" | "suspicious" | "flagged";
  sourceOfFunds: "verified" | "pending" | "suspicious";
  amlScore: number;
  flaggedReasons: string[];
  recommendations: string[];
}

interface ComplianceResultsViewProps {
  complianceData: ComplianceData;
  amlData: AMLData;
}

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "low": case "clear": case "passed": case "normal": case "verified":
      return "text-success";
    case "medium": case "warning": case "under_review": case "pending":
      return "text-warning";
    case "high": case "flagged": case "failed": case "suspicious":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

const getRiskIcon = (status: string) => {
  switch (status) {
    case "passed": case "clear": case "verified": case "normal":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "warning": case "under_review": case "pending":
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    case "failed": case "flagged": case "suspicious":
      return <XCircle className="h-4 w-4 text-destructive" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
  }
};

export const ComplianceResultsView = ({ complianceData, amlData }: ComplianceResultsViewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Compliance Check Results */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Compliance Check Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                {getRiskIcon(complianceData.kycStatus)}
                <span className="font-medium">KYC Verification</span>
              </div>
              <Badge variant={complianceData.kycStatus === "passed" ? "default" : 
                complianceData.kycStatus === "warning" ? "warning" : "destructive"}>
                {complianceData.kycStatus.replace("_", " ").toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                {getRiskIcon(complianceData.sanctionsCheck)}
                <span className="font-medium">Sanctions Screening</span>
              </div>
              <Badge variant={complianceData.sanctionsCheck === "clear" ? "default" : 
                complianceData.sanctionsCheck === "under_review" ? "warning" : "destructive"}>
                {complianceData.sanctionsCheck.replace("_", " ").toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                {getRiskIcon(complianceData.pepCheck)}
                <span className="font-medium">PEP Check</span>
              </div>
              <Badge variant={complianceData.pepCheck === "clear" ? "default" : 
                complianceData.pepCheck === "under_review" ? "warning" : "destructive"}>
                {complianceData.pepCheck.replace("_", " ").toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-primary" />
                <span className="font-medium">Risk Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("font-bold text-lg", getRiskColor(
                  complianceData.riskScore < 30 ? "low" : 
                  complianceData.riskScore < 70 ? "medium" : "high"
                ))}>
                  {complianceData.riskScore}/100
                </div>
              </div>
            </div>
          </div>

          {complianceData.complianceNotes.length > 0 && (
            <div className="mt-4">
              <span className="text-sm font-medium">Compliance Notes:</span>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                {complianceData.complianceNotes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2"></span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AML Check Results */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-warning" />
            AML Check Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                {getRiskIcon(amlData.riskRating)}
                <span className="font-medium">Risk Rating</span>
              </div>
              <Badge variant={amlData.riskRating === "low" ? "default" : 
                amlData.riskRating === "medium" ? "warning" : "destructive"}>
                {amlData.riskRating.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                {getRiskIcon(amlData.transactionPatterns)}
                <span className="font-medium">Transaction Patterns</span>
              </div>
              <Badge variant={amlData.transactionPatterns === "normal" ? "default" : 
                amlData.transactionPatterns === "suspicious" ? "warning" : "destructive"}>
                {amlData.transactionPatterns.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                {getRiskIcon(amlData.sourceOfFunds)}
                <span className="font-medium">Source of Funds</span>
              </div>
              <Badge variant={amlData.sourceOfFunds === "verified" ? "default" : 
                amlData.sourceOfFunds === "pending" ? "warning" : "destructive"}>
                {amlData.sourceOfFunds.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-warning" />
                <span className="font-medium">AML Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("font-bold text-lg", getRiskColor(
                  amlData.amlScore < 30 ? "low" : 
                  amlData.amlScore < 70 ? "medium" : "high"
                ))}>
                  {amlData.amlScore}/100
                </div>
              </div>
            </div>
          </div>

          {amlData.flaggedReasons.length > 0 && (
            <div className="mt-4">
              <span className="text-sm font-medium">Flagged Items:</span>
              <ul className="text-sm text-destructive mt-2 space-y-1">
                {amlData.flaggedReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="h-3 w-3 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {amlData.recommendations.length > 0 && (
            <div className="mt-4">
              <span className="text-sm font-medium">Recommendations:</span>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                {amlData.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-success mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};