
import { useState, useMemo } from "react";
import { CalendarIcon, Search, ArrowUpRight, ArrowDownLeft, Filter } from "lucide-react";
import Shell from "@/components/layout/Shell";
import { cn } from "@/lib/utils";

// Sample transaction data
const TRANSACTIONS = [
  {
    id: "t1",
    title: "Salary Deposit",
    amount: 5000,
    date: "2023-08-15",
    type: "income" as const,
    category: "Income",
    account: "Checking Account"
  },
  {
    id: "t2",
    title: "Rent Payment",
    amount: 1800,
    date: "2023-08-02",
    type: "expense" as const,
    category: "Housing",
    account: "Checking Account"
  },
  {
    id: "t3",
    title: "Stock Dividend",
    amount: 320,
    date: "2023-08-10",
    type: "income" as const,
    category: "Investment",
    account: "Investment Account"
  },
  {
    id: "t4",
    title: "Grocery Shopping",
    amount: 210,
    date: "2023-08-08",
    type: "expense" as const,
    category: "Food",
    account: "Credit Card"
  },
  {
    id: "t5",
    title: "Freelance Work",
    amount: 750,
    date: "2023-08-05",
    type: "income" as const,
    category: "Income",
    account: "Checking Account"
  },
  {
    id: "t6",
    title: "Restaurant Dinner",
    amount: 120,
    date: "2023-08-12",
    type: "expense" as const,
    category: "Food",
    account: "Credit Card"
  },
  {
    id: "t7",
    title: "Utilities Bill",
    amount: 180,
    date: "2023-08-14",
    type: "expense" as const,
    category: "Utilities",
    account: "Checking Account"
  },
  {
    id: "t8",
    title: "Stock Purchase",
    amount: 1000,
    date: "2023-08-06",
    type: "expense" as const,
    category: "Investment",
    account: "Investment Account"
  },
  {
    id: "t9",
    title: "Gasoline",
    amount: 60,
    date: "2023-08-09",
    type: "expense" as const,
    category: "Transportation",
    account: "Credit Card"
  },
  {
    id: "t10",
    title: "Online Course",
    amount: 200,
    date: "2023-08-07",
    type: "expense" as const,
    category: "Education",
    account: "Credit Card"
  },
  {
    id: "t11",
    title: "Health Insurance",
    amount: 350,
    date: "2023-08-01",
    type: "expense" as const,
    category: "Health",
    account: "Checking Account"
  },
  {
    id: "t12",
    title: "Bonus Payment",
    amount: 1500,
    date: "2023-08-16",
    type: "income" as const,
    category: "Income",
    account: "Checking Account"
  },
  {
    id: "t13",
    title: "Internet Bill",
    amount: 80,
    date: "2023-08-03",
    type: "expense" as const,
    category: "Utilities",
    account: "Credit Card"
  },
  {
    id: "t14",
    title: "Gym Membership",
    amount: 50,
    date: "2023-08-05",
    type: "expense" as const,
    category: "Health",
    account: "Credit Card"
  },
  {
    id: "t15",
    title: "Movie Tickets",
    amount: 30,
    date: "2023-08-13",
    type: "expense" as const,
    category: "Entertainment",
    account: "Credit Card"
  }
];

// All unique categories
const ALL_CATEGORIES = Array.from(new Set(TRANSACTIONS.map(t => t.category)));
// All unique accounts
const ALL_ACCOUNTS = Array.from(new Set(TRANSACTIONS.map(t => t.account)));

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [accountFilter, setAccountFilter] = useState<string | null>(null);
  const [dateRangeFilter, setDateRangeFilter] = useState<"all" | "this-week" | "this-month">("all");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  const filteredTransactions = useMemo(() => {
    return TRANSACTIONS.filter((transaction) => {
      // Search filter
      const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.account.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Type filter
      const matchesType = typeFilter === "all" || transaction.type === typeFilter;
      
      // Category filter
      const matchesCategory = !categoryFilter || transaction.category === categoryFilter;
      
      // Account filter
      const matchesAccount = !accountFilter || transaction.account === accountFilter;
      
      // Date range filter
      let matchesDateRange = true;
      if (dateRangeFilter !== "all") {
        const today = new Date();
        const transactionDate = new Date(transaction.date);
        
        if (dateRangeFilter === "this-week") {
          const dayOfWeek = today.getDay();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - dayOfWeek);
          startOfWeek.setHours(0, 0, 0, 0);
          matchesDateRange = transactionDate >= startOfWeek;
        } else if (dateRangeFilter === "this-month") {
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          matchesDateRange = transactionDate >= startOfMonth;
        }
      }
      
      return matchesSearch && matchesType && matchesCategory && matchesAccount && matchesDateRange;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchTerm, typeFilter, categoryFilter, accountFilter, dateRangeFilter]);
  
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
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpense;
  
  return (
    <Shell>
      <div className="mb-8">
        <h1 className="font-medium text-2xl md:text-3xl text-balance tracking-tight">Transactions</h1>
        <p className="text-muted-foreground mt-1">View and manage your financial transactions.</p>
      </div>
      
      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-2xl p-6 card-hover animate-scale-in">
          <p className="text-muted-foreground text-sm font-medium">Total Income</p>
          <h3 className="text-2xl font-semibold mt-1 text-finance-positive">{formatCurrency(totalIncome)}</h3>
        </div>
        <div className="glass rounded-2xl p-6 card-hover animate-scale-in">
          <p className="text-muted-foreground text-sm font-medium">Total Expenses</p>
          <h3 className="text-2xl font-semibold mt-1 text-finance-negative">{formatCurrency(totalExpense)}</h3>
        </div>
        <div className="glass rounded-2xl p-6 card-hover animate-scale-in">
          <p className="text-muted-foreground text-sm font-medium">Balance</p>
          <h3 className={cn(
            "text-2xl font-semibold mt-1",
            balance >= 0 ? "text-finance-positive" : "text-finance-negative"
          )}>
            {balance >= 0 ? "+" : "-"}{formatCurrency(Math.abs(balance))}
          </h3>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="glass rounded-2xl p-6 mb-8 animate-scale-in">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
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
          
          {/* Type Filters */}
          <div className="flex space-x-2">
            <button
              onClick={() => setTypeFilter("all")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                typeFilter === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              All
            </button>
            <button
              onClick={() => setTypeFilter("income")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                typeFilter === "income" 
                  ? "bg-finance-positive/90 text-white" 
                  : "bg-finance-positive/10 text-finance-positive hover:bg-finance-positive/20"
              )}
            >
              Income
            </button>
            <button
              onClick={() => setTypeFilter("expense")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                typeFilter === "expense" 
                  ? "bg-finance-negative/90 text-white" 
                  : "bg-finance-negative/10 text-finance-negative hover:bg-finance-negative/20"
              )}
            >
              Expenses
            </button>
            
            {/* Additional Filters Button */}
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center"
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </button>
          </div>
        </div>
        
        {/* Advanced Filters (expandable) */}
        {isFilterMenuOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-secondary/30 rounded-lg animate-slide-down">
            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Date Range</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setDateRangeFilter("all")}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-lg transition-colors flex-1",
                    dateRangeFilter === "all" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  All Time
                </button>
                <button
                  onClick={() => setDateRangeFilter("this-week")}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-lg transition-colors flex-1",
                    dateRangeFilter === "this-week" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  This Week
                </button>
                <button
                  onClick={() => setDateRangeFilter("this-month")}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-lg transition-colors flex-1",
                    dateRangeFilter === "this-month" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  This Month
                </button>
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select 
                className="bg-secondary/50 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                value={categoryFilter || ""}
                onChange={(e) => setCategoryFilter(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {ALL_CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Account Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Account</label>
              <select 
                className="bg-secondary/50 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                value={accountFilter || ""}
                onChange={(e) => setAccountFilter(e.target.value || null)}
              >
                <option value="">All Accounts</option>
                {ALL_ACCOUNTS.map((account) => (
                  <option key={account} value={account}>{account}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        {/* Transaction List */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-hide">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className={cn(
                      "p-3 rounded-xl",
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
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="inline-block px-2 py-0.5 text-xs bg-secondary/80 rounded-full">
                        {transaction.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {transaction.account}
                      </span>
                    </div>
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
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {formatDate(transaction.date)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No transactions found</p>
              <button 
                className="mt-2 text-sm text-primary underline"
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                  setCategoryFilter(null);
                  setAccountFilter(null);
                  setDateRangeFilter("all");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
};

export default Transactions;
