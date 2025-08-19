import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddCustomerModal } from "./AddCustomerModal";
import { OnboardingProgress } from "./OnboardingProgress";
import { Users, Clock, CheckCircle, AlertCircle, Search, Plus } from "lucide-react";

interface Customer {
  id: string;
  company: string;
  applicationId: string;
  submissionDate: string;
  currentStage: string;
  status: "In Progress" | "On Hold" | "Completed";
  lastUpdated: string;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    company: "Global Logistics",
    applicationId: "APP-2025-4716",
    submissionDate: "14 Mar 2025",
    currentStage: "Account Creation",
    status: "In Progress",
    lastUpdated: "14 Mar 2025"
  },
  {
    id: "2", 
    company: "Nippon Trading",
    applicationId: "APP-2025-8501",
    submissionDate: "13 Mar 2025",
    currentStage: "Mareva Injunction",
    status: "On Hold",
    lastUpdated: "13 Mar 2025"
  },
  {
    id: "3",
    company: "Technova",
    applicationId: "APP-2025-8732",
    submissionDate: "13 Mar 2025", 
    currentStage: "Mareva Injunction",
    status: "In Progress",
    lastUpdated: "13 Mar 2025"
  },
  {
    id: "4",
    company: "FinTech Global Ltd",
    applicationId: "APP-2025-1881",
    submissionDate: "13 Mar 2025",
    currentStage: "Completed",
    status: "Completed",
    lastUpdated: "13 Mar 2025"
  },
  {
    id: "5",
    company: "TechNova",
    applicationId: "APP-2025-8234",
    submissionDate: "13 Mar 2025",
    currentStage: "Completed", 
    status: "Completed",
    lastUpdated: "13 Mar 2025"
  },
  {
    id: "6",
    company: "JerCorp",
    applicationId: "APP-2025-7435",
    submissionDate: "13 Mar 2025",
    currentStage: "Completed",
    status: "Completed",
    lastUpdated: "13 Mar 2025"
  },
  {
    id: "7",
    company: "Trushop",
    applicationId: "APP-2025-3074",
    submissionDate: "13 Mar 2025",
    currentStage: "Mareva Injunction",
    status: "In Progress",
    lastUpdated: "13 Mar 2025"
  },
  {
    id: "8",
    company: "CloudShift Inc",
    applicationId: "APP-2025-9123",
    submissionDate: "12 Mar 2025",
    currentStage: "Validation",
    status: "In Progress",
    lastUpdated: "12 Mar 2025"
  },
  {
    id: "9",
    company: "AgriWorld Pvt Ltd",
    applicationId: "APP-2025-5678",
    submissionDate: "11 Mar 2025",
    currentStage: "AML Check",
    status: "On Hold",
    lastUpdated: "11 Mar 2025"
  }
];

export const HarvisDashboard = () => {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const totalCustomers = customers.length;
  const inProgress = customers.filter(c => c.status === "In Progress").length;
  const completed = customers.filter(c => c.status === "Completed").length;
  const onHold = customers.filter(c => c.status === "On Hold").length;

  const filteredCustomers = customers.filter(customer =>
    customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Customer["status"]) => {
    switch (status) {
      case "In Progress":
        return <Badge className="bg-warning/10 text-warning border-warning/20">In Progress</Badge>;
      case "On Hold":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">On Hold</Badge>;
      case "Completed":
        return <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  if (selectedCustomer) {
    return (
      <OnboardingProgress 
        customer={selectedCustomer}
        onBack={() => setSelectedCustomer(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Harvis Bank</h1>
              <p className="text-sm text-muted-foreground">Customer Onboarding Dashboard</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <span className="text-sm">Mareva DataBase</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{inProgress}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{completed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">On Hold</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{onHold}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Add Customer */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add New Customer
          </Button>
        </div>

        {/* Customer Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-muted-foreground">Company</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Application ID</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Submission Date</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Current Stage</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Last Updated</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4 font-medium">{customer.company}</td>
                      <td className="p-4 text-muted-foreground">{customer.applicationId}</td>
                      <td className="p-4 text-muted-foreground">{customer.submissionDate}</td>
                      <td className="p-4 text-muted-foreground">{customer.currentStage}</td>
                      <td className="p-4">{getStatusBadge(customer.status)}</td>
                      <td className="p-4 text-muted-foreground">{customer.lastUpdated}</td>
                      <td className="p-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewCustomer(customer)}
                          className="text-primary hover:text-primary/80"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <AddCustomerModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </div>
  );
};