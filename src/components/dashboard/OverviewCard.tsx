
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OverviewCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon?: ReactNode;
  className?: string;
}

const OverviewCard = ({
  title,
  value,
  change,
  icon,
  className,
}: OverviewCardProps) => {
  return (
    <div className={cn(
      "glass rounded-2xl p-6 card-hover animate-scale-in", 
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-semibold tracking-tight">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  change.positive
                    ? "bg-finance-positive/10 text-finance-positive"
                    : "bg-finance-negative/10 text-finance-negative"
                )}
              >
                {change.positive ? "+" : ""}{change.value}
              </span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="bg-secondary/80 p-3 rounded-xl">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewCard;
