
import { useState, useEffect } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allCurrencies, getCurrencyByCode } from "@/utils/currencyUtils";
import { useToast } from "@/hooks/use-toast";

// Types
export interface NewTransaction {
  title: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  category: string;
  account: string;
  currency: string;
}

interface AddTransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: NewTransaction) => void;
  categories: string[];
  accounts: string[];
}

const AddTransactionDialog = ({ 
  isOpen, 
  onClose, 
  onAddTransaction,
  categories,
  accounts
}: AddTransactionDialogProps) => {
  const { toast } = useToast();
  const [transaction, setTransaction] = useState<NewTransaction>({
    title: "",
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    type: "expense",
    category: categories[0] || "",
    account: accounts[0] || "",
    currency: "USD"
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTransaction({
        title: "",
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        type: "expense",
        category: categories[0] || "",
        account: accounts[0] || "",
        currency: "USD"
      });
    }
  }, [isOpen, categories, accounts]);

  const handleChange = (field: keyof NewTransaction, value: string | number) => {
    setTransaction(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!transaction.title.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a title for the transaction",
        variant: "destructive",
      });
      return;
    }

    if (transaction.amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Amount must be greater than zero",
        variant: "destructive",
      });
      return;
    }

    onAddTransaction(transaction);
    onClose();
    
    toast({
      title: "Transaction added",
      description: `${transaction.title} has been added successfully`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Enter the details of your new transaction.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Transaction Type */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={transaction.type === "income" ? "default" : "outline"}
              className={transaction.type === "income" ? "bg-finance-positive/90 text-white hover:bg-finance-positive" : ""}
              onClick={() => handleChange("type", "income")}
            >
              Income
            </Button>
            <Button
              type="button"
              variant={transaction.type === "expense" ? "default" : "outline"}
              className={transaction.type === "expense" ? "bg-finance-negative/90 text-white hover:bg-finance-negative" : ""}
              onClick={() => handleChange("type", "expense")}
            >
              Expense
            </Button>
          </div>
          
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={transaction.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g., Salary, Rent, Groceries"
            />
          </div>
          
          {/* Amount and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={transaction.amount || ""}
                onChange={(e) => handleChange("amount", parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={transaction.currency}
                onValueChange={(value) => handleChange("currency", value)}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">$ USD</SelectItem>
                  <SelectItem value="EUR">€ EUR</SelectItem>
                  <SelectItem value="GBP">£ GBP</SelectItem>
                  <SelectItem value="JPY">¥ JPY</SelectItem>
                  <SelectItem value="BTC">₿ BTC</SelectItem>
                  <SelectItem value="ETH">Ξ ETH</SelectItem>
                  <SelectItem value="SOL">SOL</SelectItem>
                  {allCurrencies
                    .filter(c => !["USD", "EUR", "GBP", "JPY", "BTC", "ETH", "SOL"].includes(c.code))
                    .map(currency => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Category */}
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={transaction.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Account */}
          <div className="grid gap-2">
            <Label htmlFor="account">Account</Label>
            <Select
              value={transaction.account}
              onValueChange={(value) => handleChange("account", value)}
            >
              <SelectTrigger id="account">
                <SelectValue placeholder="Select Account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map(account => (
                  <SelectItem key={account} value={account}>
                    {account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Date */}
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={transaction.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
