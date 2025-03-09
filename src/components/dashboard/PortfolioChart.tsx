
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface AssetData {
  name: string;
  value: number;
  color: string;
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

  return (
    <div className="glass rounded-2xl p-6 h-[400px] card-hover animate-scale-in">
      <h3 className="text-lg font-medium mb-6">Portfolio Allocation</h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={formattedData}
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
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Allocation']}
            contentStyle={{ 
              borderRadius: '0.75rem',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}
          />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ paddingLeft: "20px" }}
            formatter={(value) => (
              <span className="text-sm font-medium text-foreground">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
