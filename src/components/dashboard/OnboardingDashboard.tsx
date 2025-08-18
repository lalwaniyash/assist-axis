import React, { useState } from "react";
import { OnboardingHeader } from "./OnboardingHeader";
import { HorizontalStepper, Step } from "./HorizontalStepper";
import { VerticalStepper, SubStep } from "./VerticalStepper";
import { ProgressBar } from "./ProgressBar";
import { ApprovalSection } from "./ApprovalSection";
import { AccountDetailsCard } from "./AccountDetailsCard";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const STEPS: Step[] = [
  { id: "upload", title: "Upload", status: "completed" },
  { id: "ocr", title: "OCR", status: "completed" },
  { id: "validation", title: "Validation", status: "in-progress" },
  { id: "compliance", title: "Compliance", status: "pending" },
  { id: "account", title: "Account Creation", status: "pending" }
];

const SUB_STEPS: Record<string, SubStep[]> = {
  upload: [
    { id: "doc-upload", title: "Document Upload", status: "completed", description: "Identity documents received" },
    { id: "doc-verify", title: "Document Verification", status: "completed", description: "Documents verified successfully" }
  ],
  ocr: [
    { id: "text-extract", title: "Text Extraction", status: "completed", description: "OCR processing completed" },
    { id: "data-parse", title: "Data Parsing", status: "completed", description: "Customer data extracted" }
  ],
  validation: [
    { id: "data-validate", title: "Data Validation", status: "completed", description: "Customer information validated" },
    { id: "identity-check", title: "Identity Verification", status: "in-progress", description: "Checking against identity databases" },
    { id: "address-verify", title: "Address Verification", status: "pending", description: "Address validation pending" }
  ],
  compliance: [
    { id: "kyc-check", title: "KYC Screening", status: "pending", description: "Know Your Customer checks" },
    { id: "aml-scan", title: "AML Screening", status: "pending", description: "Anti-Money Laundering checks" },
    { id: "sanctions-check", title: "Sanctions Check", status: "pending", description: "Sanctions list verification" }
  ],
  account: [
    { id: "account-gen", title: "Generate Account", status: "pending", description: "Create customer account" },
    { id: "welcome-email", title: "Welcome Communication", status: "pending", description: "Send welcome email and materials" }
  ]
};

export const OnboardingDashboard = () => {
  const [currentStep, setCurrentStep] = useState(2); // Validation step (0-indexed)
  const [steps, setSteps] = useState(STEPS);
  const [requiresApproval, setRequiresApproval] = useState(true);
  const [accountDetails, setAccountDetails] = useState(null);
  const { toast } = useToast();

  const currentStepId = steps[currentStep]?.id || "validation";
  const currentSubSteps = SUB_STEPS[currentStepId] || [];
  
  // Calculate progress percentage
  const completedSteps = steps.filter(step => step.status === "completed").length;
  const progressPercentage = Math.round((completedSteps / steps.length) * 100);
  
  const progressStatus = steps.some(step => step.status === "in-progress") 
    ? "in-progress" 
    : completedSteps === steps.length 
    ? "completed" 
    : "in-progress";

  const handlePutOnHold = () => {
    toast({
      title: "Application On Hold",
      description: "Customer onboarding has been paused and flagged for review.",
      variant: "destructive"
    });
  };

  const handleApprove = () => {
    setRequiresApproval(false);
    
    // Simulate progression through steps
    const updatedSteps = [...steps];
    updatedSteps[currentStep] = { ...updatedSteps[currentStep], status: "completed" };
    
    if (currentStep < steps.length - 1) {
      updatedSteps[currentStep + 1] = { ...updatedSteps[currentStep + 1], status: "in-progress" };
      setCurrentStep(currentStep + 1);
    }
    
    setSteps(updatedSteps);

    // If we've completed all steps, create account
    if (currentStep === steps.length - 1) {
      setAccountDetails({
        accountNumber: "ACC-2024-0001234",
        accountType: "Premium Savings",
        customerName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        createdDate: new Date().toLocaleDateString(),
        status: "active"
      });
    }

    toast({
      title: "Approved",
      description: "Application approved and moved to next step.",
      variant: "default"
    });

    // Set approval required for next step if not final
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setRequiresApproval(true);
      }
    }, 2000);
  };

  const handleReject = () => {
    toast({
      title: "Application Rejected",
      description: "Application has been rejected and flagged for review.",
      variant: "destructive"
    });
    setRequiresApproval(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <OnboardingHeader 
          customerName="Sarah Johnson" 
          onHold={handlePutOnHold}
        />
        
        <ProgressBar 
          percentage={progressPercentage}
          status={progressStatus}
        />
        
        <HorizontalStepper 
          steps={steps} 
          currentStep={currentStep}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VerticalStepper 
            title={steps[currentStep]?.title || "Current Step"}
            subSteps={currentSubSteps}
          />
          
          <div className="space-y-6">
            <ApprovalSection
              requiresApproval={requiresApproval}
              onApprove={handleApprove}
              onReject={handleReject}
            />
            
            <AccountDetailsCard accountDetails={accountDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};