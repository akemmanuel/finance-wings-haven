
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft, Search } from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  category: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === "all" || transaction.type === filter;
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(Math.abs(value));
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="glass rounded-2xl p-6 card-hover animate-scale-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Recent Transactions</h3>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full transition-colors",
              filter === "all" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter("income")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full transition-colors",
              filter === "income" 
                ? "bg-finance-positive/90 text-white" 
                : "bg-finance-positive/10 text-finance-positive hover:bg-finance-positive/20"
            )}
          >
            Income
          </button>
          <button
            onClick={() => setFilter("expense")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full transition-colors",
              filter === "expense" 
                ? "bg-finance-negative/90 text-white" 
                : "bg-finance-negative/10 text-finance-negative hover:bg-finance-negative/20"
            )}
          >
            Expenses
          </button>
        </div>
      </div>
      
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="bg-secondary/50 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-3 max-h-[320px] overflow-y-auto scrollbar-hide">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={cn(
                    "p-2 rounded-xl",
                    transaction.type === "income" 
                      ? "bg-finance-positive/10" 
                      : "bg-finance-negative/10"
                  )}
                >
                  {transaction.type === "income" ? (
                    <ArrowUpRight className="h-5 w-5 text-finance-positive" />
                  ) : (
                    <ArrowDownLeft className="h-5 w-5 text-finance-negative" />
                  )}
                </div>
                
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-xs text-muted-foreground">{transaction.category}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <p className={cn(
                  "font-medium",
                  transaction.type === "income" 
                    ? "text-finance-positive" 
                    : "text-finance-negative"
                )}>
                  {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
