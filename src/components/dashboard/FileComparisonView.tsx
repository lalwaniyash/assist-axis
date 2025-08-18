import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, AlertTriangle } from "lucide-react";

interface OCRData {
  name: string;
  address: string;
  dateOfBirth: string;
  idNumber: string;
  documentType: string;
  confidence: number;
}

interface LLMData {
  legalCompliance: {
    status: string;
    issues: string[];
    recommendations: string[];
  };
  riskAssessment: string;
  documentValidity: string;
}

interface FileComparisonViewProps {
  uploadedFile: {
    name: string;
    url: string;
    type: string;
  };
  ocrData: OCRData;
  llmData: LLMData;
}

export const FileComparisonView = ({ uploadedFile, ocrData, llmData }: FileComparisonViewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Original File View */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Uploaded Document
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">File Name:</span>
              <span className="font-medium">{uploadedFile.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <Badge variant="secondary">{uploadedFile.type}</Badge>
            </div>
            <div className="mt-4 border rounded-lg p-4 bg-muted/30 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Document Preview</p>
                <p className="text-xs text-muted-foreground mt-1">{uploadedFile.url}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extracted Data Tabs */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-warning" />
            Extracted Data Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ocr" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ocr">OCR Data</TabsTrigger>
              <TabsTrigger value="llm">Legal Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ocr" className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Confidence Score:</span>
                  <Badge variant={ocrData.confidence > 90 ? "default" : "warning"}>
                    {ocrData.confidence}%
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Name:</span>
                    <span className="font-medium">{ocrData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">ID Number:</span>
                    <span className="font-medium">{ocrData.idNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date of Birth:</span>
                    <span className="font-medium">{ocrData.dateOfBirth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Document Type:</span>
                    <Badge variant="secondary">{ocrData.documentType}</Badge>
                  </div>
                  <div className="pt-2">
                    <span className="text-sm text-muted-foreground">Address:</span>
                    <p className="font-medium mt-1 text-sm">{ocrData.address}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="llm" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Legal Compliance:</span>
                    <Badge variant={llmData.legalCompliance.status === "compliant" ? "default" : "warning"}>
                      {llmData.legalCompliance.status}
                    </Badge>
                  </div>
                  {llmData.legalCompliance.issues.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Issues Found:</span>
                      {llmData.legalCompliance.issues.map((issue, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs">
                          <AlertTriangle className="h-3 w-3 text-warning mt-0.5" />
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-sm font-medium">Document Validity:</span>
                  <p className="text-sm text-muted-foreground mt-1">{llmData.documentValidity}</p>
                </div>

                <div>
                  <span className="text-sm font-medium">Risk Assessment:</span>
                  <p className="text-sm text-muted-foreground mt-1">{llmData.riskAssessment}</p>
                </div>

                <div>
                  <span className="text-sm font-medium">Recommendations:</span>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    {llmData.legalCompliance.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2"></span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};