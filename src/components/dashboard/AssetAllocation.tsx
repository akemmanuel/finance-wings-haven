
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { formatCurrencyValue } from "@/utils/currencyUtils";
import { Bitcoin, DollarSign } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  allocation: number;
  value: number;
  change: {
    value: number;
    percentage: number;
  };
  color: string;
  currency: string;
  type: 'fiat' | 'crypto';
}

interface AssetAllocationProps {
  assets: Asset[];
}

const AssetAllocation = ({ assets }: AssetAllocationProps) => {
  const [sortBy, setSortBy] = useState<"allocation" | "value" | "change">("allocation");
  
  const sortedAssets = useMemo(() => {
    return [...assets].sort((a, b) => {
      if (sortBy === "allocation") return b.allocation - a.allocation;
      if (sortBy === "value") return b.value - a.value;
      return b.change.percentage - a.change.percentage;
    });
  }, [assets, sortBy]);
  
  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };
  
  return (
    <div className="glass rounded-2xl p-6 card-hover animate-scale-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Asset Allocation</h3>
        
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
            onClick={() => setSortBy("change")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full transition-colors",
              sortBy === "change" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            Change
          </button>
        </div>
      </div>
      
      <div className="space-y-4 max-h-[360px] overflow-y-auto scrollbar-hide">
        {sortedAssets.map((asset) => (
          <div key={asset.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: asset.color }}
            />
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{asset.name}</p>
              <span className="text-xs text-muted-foreground">
                {asset.type === 'crypto' ? (
                  <span className="flex items-center">
                    <Bitcoin className="h-3 w-3 mr-1" />
                    {asset.currency}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {asset.currency}
                  </span>
                )}
              </span>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">{formatCurrencyValue(asset.value, asset.currency)}</span>
              <span className="text-xs">{asset.allocation}%</span>
            </div>
            
            <div 
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                asset.change.percentage > 0
                  ? "bg-finance-positive/10 text-finance-positive"
                  : asset.change.percentage < 0
                  ? "bg-finance-negative/10 text-finance-negative"
                  : "bg-finance-neutral/10 text-finance-neutral"
              )}
            >
              {formatPercentage(asset.change.percentage)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetAllocation;
