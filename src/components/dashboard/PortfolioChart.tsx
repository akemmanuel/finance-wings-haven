
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Bitcoin, DollarSign } from "lucide-react";

interface AssetData {
  name: string;
  value: number;
  color: string;
  currency: string;
  type: 'fiat' | 'crypto';
}

interface PortfolioChartProps {
  data: AssetData[];
}

const PortfolioChart = ({ data }: PortfolioChartProps) => {
  const formattedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      value: Math.max(item.value, 0)
    }));
  }, [data]);

  // Custom tooltip content for better currency visualization
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/90 backdrop-blur-sm border border-border p-3 rounded-lg shadow-sm">
          <p className="font-medium text-sm">{data.name}</p>
          <div className="flex items-center text-sm mt-1">
            {data.type === 'crypto' ? (
              <Bitcoin className="h-3 w-3 mr-1 text-muted-foreground" />
            ) : (
              <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
            )}
            <span>{data.currency}: {data.realValue.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {data.value}% of portfolio
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-2xl p-6 h-[400px] card-hover animate-scale-in">
      <h3 className="text-lg font-medium mb-6">Portfolio Allocation</h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={formattedData.map(item => ({
              ...item,
              realValue: item.value, // Store the original value
              value: item.value // For chart display
            }))}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            innerRadius={60}
            paddingAngle={2}
            dataKey="value"
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ paddingLeft: "20px" }}
            formatter={(value, entry: any) => {
              const item = entry.payload;
              return (
                <span className="flex items-center text-sm">
                  {item.type === 'crypto' ? (
                    <Bitcoin className="h-3 w-3 mr-1 inline" />
                  ) : (
                    <DollarSign className="h-3 w-3 mr-1 inline" />
                  )}
                  <span className="font-medium text-foreground">{value}</span>
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
