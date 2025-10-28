import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const InvestmentPortfolio = () => {
  const data = [
    { name: "Stocks", value: 45, color: "hsl(var(--primary))" },
    { name: "Mutual Funds", value: 25, color: "hsl(var(--success))" },
    { name: "Crypto", value: 15, color: "hsl(var(--accent))" },
    { name: "Real Estate", value: 10, color: "hsl(var(--warning))" },
    { name: "Others", value: 5, color: "hsl(var(--muted-foreground))" }
  ];

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
      <CardHeader>
        <CardTitle>Investment Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-3 bg-success-light rounded-lg">
            <p className="text-xs text-muted-foreground">Total Returns</p>
            <p className="text-lg font-bold text-success">+18.5%</p>
          </div>
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <p className="text-xs text-muted-foreground">Portfolio Value</p>
            <p className="text-lg font-bold text-primary">$32,150</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentPortfolio;
