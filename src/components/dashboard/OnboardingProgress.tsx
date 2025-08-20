import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Clock, AlertCircle, File, FileText } from "lucide-react";
import { HumanVerificationModal } from "./HumanVerificationModal";
import { ComplianceResultsView } from "./ComplianceResultsView";
import { AccountTypeModal } from "./AccountTypeModal";
import { cn } from "@/lib/utils";

interface Customer {
  id: string;
  company: string;
  applicationId: string;
  submissionDate: string;
  currentStage: string;
  status: "In Progress" | "On Hold" | "Completed";
  lastUpdated: string;
}

interface OnboardingProgressProps {
  customer: Customer;
  onBack: () => void;
}

interface Step {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
}

interface SubStep {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
}

const INITIAL_STEPS: Step[] = [
  { id: "ocr", title: "OCR Processing", status: "in-progress" },
  { id: "human-approval", title: "Human Approval", status: "pending" },
  { id: "compliance", title: "Compliance & AML", status: "pending" },
  { id: "final-approval", title: "Human Approval", status: "pending" },
  { id: "account", title: "Account Creation", status: "pending" }
];

const INITIAL_SUBSTEPS: Record<string, SubStep[]> = {
  ocr: [
    { id: "loading-pdf", title: "Loading PDF", status: "completed" },
    { id: "ocr-processing", title: "OCR Processing", status: "in-progress" },
    { id: "extracting-data", title: "Extracting Data", status: "pending" },
    { id: "storing-results", title: "Storing Results", status: "pending" }
  ],
  "human-approval": [
    { id: "document-review", title: "Document Review", status: "pending" },
    { id: "data-validation", title: "Data Validation", status: "pending" }
  ],
  compliance: [
    { id: "sanctions-screening", title: "Sanctions & PEP screening", status: "pending" },
    { id: "adverse-media", title: "Adverse media checks", status: "pending" },
    { id: "identity-verification", title: "Identity verification", status: "pending" },
    { id: "risk-assessment", title: "Risk assessment", status: "pending" }
  ],
  "final-approval": [
    { id: "compliance-review", title: "Compliance Review", status: "pending" },
    { id: "final-validation", title: "Final Validation", status: "pending" }
  ],
  account: [
    { id: "account-generation", title: "Account Generation", status: "pending" },
    { id: "welcome-communication", title: "Welcome Communication", status: "pending" }
  ]
};

export const OnboardingProgress = ({ customer, onBack }: OnboardingProgressProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
  const [subSteps, setSubSteps] = useState<Record<string, SubStep[]>>(INITIAL_SUBSTEPS);
  const [showHumanVerification, setShowHumanVerification] = useState(false);
  const [showComplianceResults, setShowComplianceResults] = useState(false);
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);
  const [currentView, setCurrentView] = useState<"processing" | "document-comparison" | "compliance" | "final" | "account" | "account-success">("processing");

  const currentStep = steps[currentStepIndex];
  const currentSubSteps = subSteps[currentStep?.id] || [];

  // Simulate OCR processing
  useEffect(() => {
    if (currentStepIndex === 0) {
      const timer1 = setTimeout(() => {
        setSubSteps(prev => ({
          ...prev,
          ocr: prev.ocr.map(step => 
            step.id === "ocr-processing" 
              ? { ...step, status: "completed" }
              : step.id === "extracting-data"
              ? { ...step, status: "in-progress" }
              : step
          )
        }));
      }, 2000);

      const timer2 = setTimeout(() => {
        setSubSteps(prev => ({
          ...prev,
          ocr: prev.ocr.map(step => 
            step.id === "extracting-data" 
              ? { ...step, status: "completed" }
              : step.id === "storing-results"
              ? { ...step, status: "in-progress" }
              : step
          )
        }));
      }, 4000);

      const timer3 = setTimeout(() => {
        setSubSteps(prev => ({
          ...prev,
          ocr: prev.ocr.map(step => 
            step.id === "storing-results" 
              ? { ...step, status: "completed" }
              : step
          )
        }));
        
        setSteps(prev => prev.map((step, index) => 
          index === 0 
            ? { ...step, status: "completed" }
            : index === 1
            ? { ...step, status: "in-progress" }
            : step
        ));
        
        setCurrentView("document-comparison");
      }, 6000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [currentStepIndex]);

  const getStepIcon = (status: Step["status"], index: number) => {
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

  const getSubStepIcon = (status: SubStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-warning animate-pulse" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleAcceptAndContinue = () => {
    console.log('Accept and Continue clicked, current step index:', currentStepIndex);
    
    if (currentStepIndex === 0) {
      // From document-comparison, show human verification modal first
      setShowHumanVerification(true);
    }
  };

  const handleFirstHumanVerificationApprove = () => {
    // Move from OCR to Human Approval (completed) and start Compliance
    setSteps(prev => prev.map((step, index) => 
      index === 0 || index === 1
        ? { ...step, status: "completed" }
        : index === 2
        ? { ...step, status: "in-progress" }
        : step
    ));
    setCurrentStepIndex(2);
    setShowHumanVerification(false);
    
    // Show compliance processing view first
    setCurrentView("processing");
    
    // Start compliance substeps processing
    setSubSteps(prev => ({
      ...prev,
      compliance: prev.compliance.map((step, idx) => 
        idx === 0 ? { ...step, status: "in-progress" } : step
      )
    }));
    
    // Simulate compliance processing with progressive updates
    setTimeout(() => {
      setSubSteps(prev => ({
        ...prev,
        compliance: prev.compliance.map((step, idx) => 
          idx <= 1 ? { ...step, status: idx === 1 ? "in-progress" : "completed" } : step
        )
      }));
    }, 1000);
    
    setTimeout(() => {
      setSubSteps(prev => ({
        ...prev,
        compliance: prev.compliance.map((step, idx) => 
          idx <= 2 ? { ...step, status: idx === 2 ? "in-progress" : "completed" } : step
        )
      }));
    }, 2000);
    
    setTimeout(() => {
      setSubSteps(prev => ({
        ...prev,
        compliance: prev.compliance.map(step => ({ ...step, status: "completed" }))
      }));
      setSteps(prev => prev.map((step, index) => 
        index === 2 
          ? { ...step, status: "completed" }
          : index === 3
          ? { ...step, status: "in-progress" }
          : step
      ));
      setCurrentStepIndex(3);
      // Show compliance results view (Image 3)
      setCurrentView("compliance");
    }, 3000);
  };

  const handleFinalHumanVerificationApprove = () => {
    if (currentStepIndex === 3) {
      // Move from final approval to account creation
      setSteps(prev => prev.map((step, index) => 
        index === 3 
          ? { ...step, status: "completed" }
          : index === 4
          ? { ...step, status: "in-progress" }
          : step
      ));
      setCurrentStepIndex(4);
      setShowComplianceResults(false);
      setShowAccountTypeModal(true);
    }
  };

  const handleAccountTypeSelect = () => {
    setSteps(prev => prev.map((step, index) => 
      index === 4 ? { ...step, status: "completed" } : step
    ));
    setShowAccountTypeModal(false);
    setCurrentView("account-success");
  };

  const progressPercentage = Math.round((steps.filter(s => s.status === "completed").length / steps.length) * 100);

  if (currentView === "document-comparison") {
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
                <p className="text-sm text-muted-foreground">{customer.applicationId}</p>
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
                      {step.status === "completed" ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : step.status === "in-progress" ? (
                        <Clock className="h-6 w-6 animate-pulse" />
                      ) : (
                        <span className="font-medium">{index + 1}</span>
                      )}
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

          {/* Document Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <File className="h-5 w-5" />
                  Raw Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg">
                  <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground text-center">
                    This is a placeholder for the scanned onboarding form
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Extracted Text
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>APPLICATION FOR BANK ACCOUNT**</strong></p>
                  <p>To The Manager</p>
                  <p>First Name: John</p>
                  <p>Last Name: Doe</p>
                  <p>Date of Birth: 1985-06-15</p>
                  <p>Social Security Number: ***-**-1234</p>
                  <p>Address: 123 Main Street, Anytown, USA 12345</p>
                  <p>Email: john.doe@email.com</p>
                  <p>Phone Number: (555) 123-4567</p>
                  <p>Employment Information:**</p>
                  <p>Employer: ABC Corporation</p>
                  <p>Position: Software Engineer</p>
                  <p>ID Number: EX1234578</p>
                  <p>Issued State: California</p>
                  <p>Expiration Date: 2028-06-15</p>
                  <p>Employment Information:**</p>
                  <p>Employer: ABC Corporation</p>
                  <p>Occupation: Software Engineer</p>
                  <p>Annual Income: $75,000</p>
                  <p>Employment Status: [X] Full Time</p>
                  <p>[ ] Checking Account</p>
                  <p>[ ] Savings Account</p>
                  <p>[ ] Certificate of Deposit (CD)</p>
                  <p>I hereby certify that the information provided is true and correct to the best of my knowledge.</p>
                  <p>Signature: John Doe*</p>
                  <p>Date: 2024-10-26</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleAcceptAndContinue}
              className="bg-primary hover:bg-primary/90"
            >
              Accept and Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "compliance") {
    return <ComplianceResultsView onBack={onBack} onProceed={() => {
      console.log('Proceeding from compliance to final approval');
      // Show final human verification modal (Image 4)
      setShowComplianceResults(true);
    }} />;
  }

  if (currentView === "final") {
    return <ComplianceResultsView onBack={onBack} onProceed={() => {
      console.log('Proceeding from final compliance view');
      setShowComplianceResults(true);
    }} />;
  }

  if (currentView === "account-success") {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-success rounded-full mx-auto flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-success">Account Created Successfully!</h1>
            <p className="text-muted-foreground">Your bank account has been created and is ready to use.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Account Number</p>
                  <p className="font-mono text-lg">4716-8935-2401</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="font-medium">Savings Account</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-medium">John Doe</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Branch Code</p>
                  <p className="font-mono">HARV001</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">Welcome Package</p>
                <p className="text-sm">A welcome kit with your debit card and cheque book will be sent to your registered address within 5-7 business days.</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={onBack} className="bg-primary hover:bg-primary/90">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
              <p className="text-sm text-muted-foreground">{customer.applicationId}</p>
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

        {/* Current Step Details */}
        <Card>
          <CardHeader>
            <CardTitle>Processing Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentSubSteps.map((subStep) => (
                <div key={subStep.id} className="flex items-center space-x-3">
                  {getSubStepIcon(subStep.status)}
                  <span className={cn(
                    "text-sm",
                    subStep.status === "completed" ? "text-success" :
                    subStep.status === "in-progress" ? "text-warning" :
                    "text-muted-foreground"
                  )}>
                    {subStep.title}
                  </span>
                  {subStep.status === "completed" && (
                    <span className="text-xs text-success">Completed</span>
                  )}
                  {subStep.status === "in-progress" && (
                    <span className="text-xs text-warning">In Progress</span>
                  )}
                  {subStep.status === "pending" && (
                    <span className="text-xs text-muted-foreground">Pending</span>
                  )}
                </div>
              ))}
              
              {currentStep?.status === "in-progress" && (
                <div className="mt-4">
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Overall Progress: 25%</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <HumanVerificationModal
          isOpen={showHumanVerification}
          onClose={() => setShowHumanVerification(false)}
          onApprove={handleFirstHumanVerificationApprove}
          title="Human Verification Required"
          message="Human-in-loop verification required"
        />

        {showComplianceResults && (
          <HumanVerificationModal
            isOpen={showComplianceResults}
            onClose={() => setShowComplianceResults(false)}
            onApprove={handleFinalHumanVerificationApprove}
            title="Human Verification Required"
            message="Human-in-loop verification required"
          />
        )}

        <AccountTypeModal
          isOpen={showAccountTypeModal}
          onClose={() => setShowAccountTypeModal(false)}
          onConfirm={handleAccountTypeSelect}
        />
      </div>
    </div>
  );
};