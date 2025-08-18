import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, CreditCard, Calendar } from "lucide-react";

interface AccountDetails {
  accountNumber: string;
  accountType: string;
  customerName: string;
  email: string;
  phone: string;
  createdDate: string;
  status: "active" | "pending" | "suspended";
}

interface AccountDetailsCardProps {
  accountDetails: AccountDetails | null;
}

const getStatusVariant = (status: AccountDetails["status"]) => {
  switch (status) {
    case "active":
      return "default";
    case "pending":
      return "secondary";
    case "suspended":
      return "destructive";
  }
};

export const AccountDetailsCard = ({ accountDetails }: AccountDetailsCardProps) => {
  if (!accountDetails) return null;

  return (
    <Card className="shadow-card border border-success/20 bg-gradient-subtle">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-foreground flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-success" />
          Account Created Successfully
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Account Number</p>
              <p className="font-mono font-semibold">{accountDetails.accountNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Account Type</p>
              <p className="font-semibold">{accountDetails.accountType}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Customer Name</p>
              <p className="font-semibold">{accountDetails.customerName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-semibold">{accountDetails.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-semibold">{accountDetails.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Created Date</p>
              <p className="font-semibold">{accountDetails.createdDate}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <Badge variant={getStatusVariant(accountDetails.status)} className="capitalize">
            {accountDetails.status}
          </Badge>
          <p className="text-xs text-muted-foreground">
            Account ready for customer access
          </p>
        </div>
      </CardContent>
    </Card>
  );
};