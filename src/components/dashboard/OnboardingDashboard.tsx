import React, { useState, useEffect } from "react";
import { OnboardingHeader } from "./OnboardingHeader";
import { HorizontalStepper, Step } from "./HorizontalStepper";
import { VerticalStepper, SubStep } from "./VerticalStepper";
import { ProgressBar } from "./ProgressBar";
import { ApprovalSection } from "./ApprovalSection";
import { FileComparisonView } from "./FileComparisonView";
import { ComplianceResultsView } from "./ComplianceResultsView";
import { AccountCreationView } from "./AccountCreationView";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const STEPS: Step[] = [
  { id: "ocr", title: "OCR Processing", status: "completed" },
  { id: "human-approval-1", title: "Human Approval", status: "completed" },
  { id: "compliance-aml", title: "Risk & Compliance", status: "in-progress" },
  { id: "human-approval-2", title: "Final Approval", status: "pending" },
  { id: "account-creation", title: "Account Creation", status: "pending" }
];

const SUB_STEPS: Record<string, SubStep[]> = {
  ocr: [
    { id: "ocr-api", title: "/ocr API Processing", status: "completed", description: "Document OCR extraction completed" },
    { id: "llm-parse", title: "/llm-parse Processing", status: "completed", description: "LLM analysis and parsing completed" },
    { id: "validate", title: "/validate Processing", status: "completed", description: "Data validation completed" }
  ],
  "human-approval-1": [
    { id: "doc-review", title: "Document Review", status: "completed", description: "Original document vs extracted data comparison" },
    { id: "approve-api", title: "/approve API Call", status: "completed", description: "Human approval recorded" }
  ],
  "compliance-aml": [
    { id: "compliance-check", title: "/compliance Check", status: "in-progress", description: "Running compliance verification" },
    { id: "aml-check", title: "/aml-check Processing", status: "pending", description: "Anti-Money Laundering screening" }
  ],
  "human-approval-2": [
    { id: "compliance-review", title: "Compliance Review", status: "pending", description: "Review AML and compliance results" },
    { id: "final-approve", title: "Final Approval", status: "pending", description: "Final human approval for account creation" }
  ],
  "account-creation": [
    { id: "account-api", title: "/account-creation API", status: "pending", description: "Generate customer account" },
    { id: "account-setup", title: "Account Type Selection", status: "pending", description: "Configure account preferences" }
  ]
};

// Mock API data
const MOCK_FILE_DATA = {
  uploadedFile: {
    name: "passport_sarah_johnson.pdf",
    url: "/api/files/passport_sarah_johnson.pdf",
    type: "PDF Document"
  },
  ocrData: {
    name: "Sarah Johnson",
    address: "123 Main Street, New York, NY 10001, USA",
    dateOfBirth: "15th March 1990",
    idNumber: "P12345678",
    documentType: "Passport",
    confidence: 96
  },
  llmData: {
    legalCompliance: {
      status: "compliant",
      issues: [],
      recommendations: [
        "Document appears authentic and valid",
        "Information matches known databases",
        "No red flags detected in document analysis"
      ]
    },
    riskAssessment: "Low risk - standard processing recommended",
    documentValidity: "Document is valid and within expiration date"
  }
};

const MOCK_COMPLIANCE_DATA = {
  complianceData: {
    kycStatus: "passed" as const,
    sanctionsCheck: "clear" as const,
    pepCheck: "clear" as const,
    riskScore: 25,
    complianceNotes: [
      "Customer passed all KYC requirements",
      "No matches found in sanctions databases",
      "Clean PEP screening results"
    ]
  },
  amlData: {
    riskRating: "low" as const,
    transactionPatterns: "normal" as const,
    sourceOfFunds: "verified" as const,
    amlScore: 15,
    flaggedReasons: [],
    recommendations: [
      "Customer meets all AML requirements",
      "Source of funds properly documented",
      "Transaction history shows normal patterns"
    ]
  }
};

const MOCK_ACCOUNT_DETAILS = {
  accountNumber: "ACC-2024-789012",
  routingNumber: "021000021",
  customerId: "CUST-789012",
  branchCode: "NYC001"
};

// Mock API calls
const callAPI = async (endpoint: string): Promise<any> => {
  console.log(`Calling API: ${endpoint}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  switch (endpoint) {
    case '/ocr':
      return { success: true, data: MOCK_FILE_DATA.ocrData };
    case '/llm-parse':
      return { success: true, data: MOCK_FILE_DATA.llmData };
    case '/validate':
      return { success: true, validated: true };
    case '/approve':
      return { success: true, approved: true };
    case '/compliance':
      return { success: true, data: MOCK_COMPLIANCE_DATA.complianceData };
    case '/aml-check':
      return { success: true, data: MOCK_COMPLIANCE_DATA.amlData };
    case '/account-creation':
      return { success: true, data: MOCK_ACCOUNT_DETAILS };
    default:
      return { success: false, error: 'Unknown endpoint' };
  }
};

export const OnboardingDashboard = () => {
  const [currentStep, setCurrentStep] = useState(2); // Risk & Compliance step (0-indexed)
  const [steps, setSteps] = useState(STEPS);
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState<string>("");
  const { toast } = useToast();

  const currentStepId = steps[currentStep]?.id || "compliance-aml";
  const currentSubSteps = SUB_STEPS[currentStepId] || [];
  
  // Calculate progress percentage
  const completedSteps = steps.filter(step => step.status === "completed").length;
  const progressPercentage = Math.round((completedSteps / steps.length) * 100);
  
  const progressStatus = steps.some(step => step.status === "in-progress") 
    ? "in-progress" 
    : completedSteps === steps.length 
    ? "completed" 
    : "in-progress";

  // Simulate API processing for current step
  useEffect(() => {
    const processCurrentStep = async () => {
      if (currentStepId === "compliance-aml") {
        // Call compliance API
        try {
          const complianceResult = await callAPI('/compliance');
          if (complianceResult.success) {
            // Update sub-steps
            const updatedSubSteps = [...currentSubSteps];
            const complianceIndex = updatedSubSteps.findIndex(step => step.id === "compliance-check");
            if (complianceIndex >= 0) {
              updatedSubSteps[complianceIndex].status = "completed";
            }
            
            // Start AML check
            const amlResult = await callAPI('/aml-check');
            if (amlResult.success) {
              const amlIndex = updatedSubSteps.findIndex(step => step.id === "aml-check");
              if (amlIndex >= 0) {
                updatedSubSteps[amlIndex].status = "completed";
              }
              setRequiresApproval(true);
            }
          }
        } catch (error) {
          toast({
            title: "API Error",
            description: "Failed to process compliance checks",
            variant: "destructive"
          });
        }
      }
    };

    if (currentStepId === "compliance-aml" && steps[currentStep].status === "in-progress") {
      processCurrentStep();
    }
  }, [currentStep, currentStepId]);

  const handlePutOnHold = () => {
    toast({
      title: "Application On Hold",
      description: "Customer onboarding has been paused and flagged for review.",
      variant: "destructive"
    });
  };

  const handleApprove = async () => {
    setRequiresApproval(false);
    
    try {
      // Call approve API
      const approveResult = await callAPI('/approve');
      
      if (approveResult.success) {
        // Update current step to completed
        const updatedSteps = [...steps];
        updatedSteps[currentStep] = { ...updatedSteps[currentStep], status: "completed" };
        
        // Move to next step if available
        if (currentStep < steps.length - 1) {
          const nextStep = currentStep + 1;
          updatedSteps[nextStep] = { ...updatedSteps[nextStep], status: "in-progress" };
          setCurrentStep(nextStep);
          
          // If moving to account creation step
          if (updatedSteps[nextStep].id === "account-creation") {
            const accountResult = await callAPI('/account-creation');
            if (accountResult.success) {
              setAccountCreated(true);
              updatedSteps[nextStep] = { ...updatedSteps[nextStep], status: "completed" };
            }
          } else if (updatedSteps[nextStep].id === "human-approval-2") {
            setRequiresApproval(true);
          }
        }
        
        setSteps(updatedSteps);
        
        toast({
          title: "Approved",
          description: "Application approved and moved to next step.",
          variant: "default"
        });
      }
    } catch (error) {
      toast({
        title: "API Error",
        description: "Failed to process approval",
        variant: "destructive"
      });
    }
  };

  const handleReject = () => {
    toast({
      title: "Application Rejected",
      description: "Application has been rejected and flagged for review.",
      variant: "destructive"
    });
    setRequiresApproval(false);
  };

  const handleAccountTypeSelect = (type: string) => {
    setSelectedAccountType(type);
  };

  const handleAccountComplete = () => {
    // Reset to dashboard or redirect
    toast({
      title: "Process Complete",
      description: "Customer onboarding completed successfully!",
      variant: "default"
    });
    // Here you would typically redirect to main dashboard
  };

  const renderCurrentStepContent = () => {
    switch (currentStepId) {
      case "human-approval-1":
        return (
          <FileComparisonView
            uploadedFile={MOCK_FILE_DATA.uploadedFile}
            ocrData={MOCK_FILE_DATA.ocrData}
            llmData={MOCK_FILE_DATA.llmData}
          />
        );
      case "human-approval-2":
        return (
          <ComplianceResultsView
            complianceData={MOCK_COMPLIANCE_DATA.complianceData}
            amlData={MOCK_COMPLIANCE_DATA.amlData}
          />
        );
      case "account-creation":
        if (accountCreated) {
          return (
            <AccountCreationView
              accountDetails={MOCK_ACCOUNT_DETAILS}
              onAccountTypeSelect={handleAccountTypeSelect}
              onComplete={handleAccountComplete}
            />
          );
        }
        break;
    }
    return null;
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <VerticalStepper 
              title={steps[currentStep]?.title || "Current Step"}
              subSteps={currentSubSteps}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            {requiresApproval && (
              <ApprovalSection
                requiresApproval={requiresApproval}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            )}
            
            {renderCurrentStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
};