import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Transaction } from "./TransactionForm";

interface InvestmentPortfolioProps {
  transactions: Transaction[];
}

const InvestmentPortfolio = ({ transactions }: InvestmentPortfolioProps) => {
  // Calculate investment distribution by category
  const investmentsByCategory = transactions
    .filter(t => t.type === "investment")
    .reduce((acc: any, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + Number(transaction.amount);
      return acc;
    }, {});

  const totalInvestments = Object.values(investmentsByCategory).reduce(
    (sum: number, val: any) => sum + Number(val), 
    0
  ) as number;

  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--success))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
    "hsl(var(--muted-foreground))"
  ];

  const data = Object.entries(investmentsByCategory).map(([name, value], index) => ({
    name,
    value: Number(value),
    color: colors[index % colors.length],
  }));

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
      <CardHeader>
        <CardTitle>Investment Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No investment data yet. Start tracking your investments!
          </p>
        ) : (
          <>
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
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <p className="text-xs text-muted-foreground">Total Returns</p>
                <p className="text-lg font-bold text-success">+18.5%</p>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <p className="text-xs text-muted-foreground">Portfolio Value</p>
                <p className="text-lg font-bold text-primary">${totalInvestments.toFixed(2)}</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestmentPortfolio;
