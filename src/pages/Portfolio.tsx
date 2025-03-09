
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import Shell from "@/components/layout/Shell";
import { cn } from "@/lib/utils";

// Sample portfolio performance data
const performanceData = [
  { month: "Jan", value: 100000 },
  { month: "Feb", value: 105000 },
  { month: "Mar", value: 102000 },
  { month: "Apr", value: 108000 },
  { month: "May", value: 112000 },
  { month: "Jun", value: 118000 },
  { month: "Jul", value: 115000 },
  { month: "Aug", value: 125000 },
  { month: "Sep", value: 130000 },
  { month: "Oct", value: 128000 },
  { month: "Nov", value: 135000 },
  { month: "Dec", value: 140000 },
];

// Sample risk metrics
const riskData = [
  { name: "Alpha", value: 2.3 },
  { name: "Beta", value: 0.85 },
  { name: "Sharpe", value: 1.2 },
  { name: "Volatility", value: 12.5 },
  { name: "Max Drawdown", value: -15.2 },
];

// Sample holdings data
const holdingsData = [
  { 
    id: "1", 
    name: "Apple Inc.", 
    ticker: "AAPL", 
    allocation: 15,
    shares: 25,
    avgPrice: 150,
    currentPrice: 182.50,
    value: 4562.50,
    returnPct: 21.67,
  },
  { 
    id: "2", 
    name: "Microsoft", 
    ticker: "MSFT", 
    allocation: 12,
    shares: 18,
    avgPrice: 220,
    currentPrice: 290.20,
    value: 5223.60,
    returnPct: 31.91,
  },
  { 
    id: "3", 
    name: "Amazon", 
    ticker: "AMZN", 
    allocation: 10,
    shares: 12,
    avgPrice: 140,
    currentPrice: 138.20,
    value: 1658.40,
    returnPct: -1.29,
  },
  { 
    id: "4", 
    name: "Vanguard S&P 500 ETF", 
    ticker: "VOO", 
    allocation: 20,
    shares: 35,
    avgPrice: 380,
    currentPrice: 415.20,
    value: 14532.00,
    returnPct: 9.26,
  },
  { 
    id: "5", 
    name: "iShares Core U.S. Agg Bond", 
    ticker: "AGG", 
    allocation: 15,
    shares: 75,
    avgPrice: 110,
    currentPrice: 102.60,
    value: 7695.00,
    returnPct: -6.73,
  },
  { 
    id: "6", 
    name: "Tesla Inc.", 
    ticker: "TSLA", 
    allocation: 8,
    shares: 15,
    avgPrice: 220,
    currentPrice: 246.40,
    value: 3696.00,
    returnPct: 12.00,
  },
  { 
    id: "7", 
    name: "SPDR Gold Shares", 
    ticker: "GLD", 
    allocation: 5,
    shares: 20,
    avgPrice: 170,
    currentPrice: 182.30,
    value: 3646.00,
    returnPct: 7.24,
  },
];

const Portfolio = () => {
  const [timeRange, setTimeRange] = useState<"1M" | "3M" | "6M" | "1Y" | "All">("1Y");
  const [sortBy, setSortBy] = useState<"allocation" | "value" | "return">("allocation");
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatNumber = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };
  
  // Sort holdings based on selected criteria
  const sortedHoldings = [...holdingsData].sort((a, b) => {
    if (sortBy === "allocation") return b.allocation - a.allocation;
    if (sortBy === "value") return b.value - a.value;
    return b.returnPct - a.returnPct;
  });
  
  return (
    <Shell>
      <div className="mb-8">
        <h1 className="font-medium text-2xl md:text-3xl text-balance tracking-tight">Portfolio Details</h1>
        <p className="text-muted-foreground mt-1">Analyze your investment portfolio performance and holdings.</p>
      </div>
      
      {/* Portfolio Performance Chart */}
      <div className="glass rounded-2xl p-6 mb-8 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Portfolio Performance</h3>
          
          <div className="flex space-x-2">
            {["1M", "3M", "6M", "1Y", "All"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                  timeRange === range
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatCurrency(value)}
                width={80}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(value as number), "Portfolio Value"]}
                contentStyle={{
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0F172A"
                activeDot={{ r: 8 }}
                dot={false}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-between mt-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-muted-foreground text-sm">Starting Value</p>
            <p className="text-lg font-medium">{formatCurrency(100000)}</p>
          </div>
          <div className="flex items-center px-4">
            <ArrowRight className="h-5 w-5 text-muted-foreground mx-2" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Current Value</p>
            <p className="text-lg font-medium">{formatCurrency(140000)}</p>
          </div>
          <div className="bg-finance-positive/10 px-3 py-1 rounded-lg flex items-center text-finance-positive">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="font-medium">+40.0%</span>
          </div>
        </div>
      </div>
      
      {/* Risk Metrics & Portfolio Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Risk Metrics */}
        <div className="glass rounded-2xl p-6 animate-scale-in">
          <h3 className="text-lg font-medium mb-6">Risk Metrics</h3>
          
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={riskData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={40}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={["dataMin - 5", "dataMax + 5"]} />
                <Tooltip
                  formatter={(value) => [`${value}`, ""]}
                  contentStyle={{
                    borderRadius: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#0F172A"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Holdings Table */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 animate-scale-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Portfolio Holdings</h3>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setSortBy("allocation")}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                  sortBy === "allocation"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                % Allocation
              </button>
              <button
                onClick={() => setSortBy("value")}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                  sortBy === "value"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                Value
              </button>
              <button
                onClick={() => setSortBy("return")}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                  sortBy === "return"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                Return
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-medium text-left text-muted-foreground border-b border-border/50">
                  <th className="pb-3 pl-3">Asset</th>
                  <th className="pb-3">Shares</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Value</th>
                  <th className="pb-3 pr-3">Return</th>
                </tr>
              </thead>
              <tbody>
                {sortedHoldings.map((holding) => (
                  <tr key={holding.id} className="text-sm border-b border-border/30 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 pl-3">
                      <div>
                        <p className="font-medium">{holding.name}</p>
                        <p className="text-xs text-muted-foreground">{holding.ticker} • {holding.allocation}%</p>
                      </div>
                    </td>
                    <td className="py-3">{holding.shares}</td>
                    <td className="py-3">${formatNumber(holding.currentPrice)}</td>
                    <td className="py-3 font-medium">{formatCurrency(holding.value)}</td>
                    <td className="py-3 pr-3">
                      <div
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          holding.returnPct > 0
                            ? "bg-finance-positive/10 text-finance-positive"
                            : "bg-finance-negative/10 text-finance-negative"
                        )}
                      >
                        {holding.returnPct > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {holding.returnPct > 0 ? "+" : ""}
                        {formatNumber(holding.returnPct)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default Portfolio;
