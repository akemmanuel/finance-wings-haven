
import { DollarSign, PiggyBank, Wallet, TrendingUp } from "lucide-react";
import Shell from "@/components/layout/Shell";
import OverviewCard from "@/components/dashboard/OverviewCard";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import AssetAllocation from "@/components/dashboard/AssetAllocation";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

// Sample data for demonstration
const portfolioData = [
  { name: "Stocks", value: 45, color: "#34D399" },
  { name: "Bonds", value: 20, color: "#60A5FA" },
  { name: "Real Estate", value: 15, color: "#F87171" },
  { name: "Cash", value: 10, color: "#FBBF24" },
  { name: "Crypto", value: 10, color: "#A78BFA" }
];

const assetData = [
  { 
    id: "1", 
    name: "S&P 500 ETF", 
    allocation: 25, 
    value: 25000, 
    change: { value: 1250, percentage: 5.2 },
    color: "#34D399"
  },
  { 
    id: "2", 
    name: "Government Bonds", 
    allocation: 20, 
    value: 20000, 
    change: { value: 400, percentage: 2.0 },
    color: "#60A5FA"
  },
  { 
    id: "3", 
    name: "Real Estate Fund", 
    allocation: 15, 
    value: 15000, 
    change: { value: -750, percentage: -4.8 },
    color: "#F87171"
  },
  { 
    id: "4", 
    name: "High-Yield Savings", 
    allocation: 10, 
    value: 10000, 
    change: { value: 330, percentage: 3.4 },
    color: "#FBBF24"
  },
  { 
    id: "5", 
    name: "Bitcoin", 
    allocation: 8, 
    value: 8000, 
    change: { value: 1200, percentage: 17.6 },
    color: "#A78BFA"
  },
  { 
    id: "6", 
    name: "Ethereum", 
    allocation: 2, 
    value: 2000, 
    change: { value: 240, percentage: 13.6 },
    color: "#818CF8"
  },
  { 
    id: "7", 
    name: "Apple Inc.", 
    allocation: 12, 
    value: 12000, 
    change: { value: 840, percentage: 7.5 },
    color: "#6EE7B7"
  },
  { 
    id: "8", 
    name: "Microsoft Corp.", 
    allocation: 8, 
    value: 8000, 
    change: { value: 560, percentage: 7.5 },
    color: "#93C5FD"
  }
];

const transactionData = [
  {
    id: "t1",
    title: "Salary Deposit",
    amount: 5000,
    date: "2023-08-15",
    type: "income" as const,
    category: "Income"
  },
  {
    id: "t2",
    title: "Rent Payment",
    amount: 1800,
    date: "2023-08-02",
    type: "expense" as const,
    category: "Housing"
  },
  {
    id: "t3",
    title: "Stock Dividend",
    amount: 320,
    date: "2023-08-10",
    type: "income" as const,
    category: "Investment"
  },
  {
    id: "t4",
    title: "Grocery Shopping",
    amount: 210,
    date: "2023-08-08",
    type: "expense" as const,
    category: "Food"
  },
  {
    id: "t5",
    title: "Freelance Work",
    amount: 750,
    date: "2023-08-05",
    type: "income" as const,
    category: "Income"
  },
  {
    id: "t6",
    title: "Restaurant Dinner",
    amount: 120,
    date: "2023-08-12",
    type: "expense" as const,
    category: "Food"
  },
  {
    id: "t7",
    title: "Utilities Bill",
    amount: 180,
    date: "2023-08-14",
    type: "expense" as const,
    category: "Utilities"
  },
  {
    id: "t8",
    title: "Stock Purchase",
    amount: 1000,
    date: "2023-08-06",
    type: "expense" as const,
    category: "Investment"
  }
];

const Index = () => {
  return (
    <Shell>
      <div className="mb-8">
        <h1 className="font-medium text-2xl md:text-3xl text-balance tracking-tight">Financial Dashboard</h1>
        <p className="text-muted-foreground mt-1">Track your financial health and investment portfolio.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <OverviewCard
          title="Total Balance"
          value="$100,000"
          change={{ value: "8.2%", positive: true }}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
        />
        <OverviewCard
          title="Investments"
          value="$80,000"
          change={{ value: "12.5%", positive: true }}
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
        />
        <OverviewCard
          title="Savings"
          value="$15,000"
          change={{ value: "3.4%", positive: true }}
          icon={<PiggyBank className="h-5 w-5 text-primary" />}
        />
        <OverviewCard
          title="Expenses (Monthly)"
          value="$3,200"
          change={{ value: "2.1%", positive: false }}
          icon={<Wallet className="h-5 w-5 text-primary" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <PortfolioChart data={portfolioData} />
        </div>
        <div className="lg:col-span-2">
          <AssetAllocation assets={assetData} />
        </div>
      </div>
      
      <div className="mb-8">
        <RecentTransactions transactions={transactionData} />
      </div>
    </Shell>
  );
};

export default Index;
