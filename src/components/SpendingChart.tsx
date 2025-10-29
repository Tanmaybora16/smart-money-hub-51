import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Transaction } from "./TransactionForm";

interface SpendingChartProps {
  transactions: Transaction[];
}

const SpendingChart = ({ transactions }: SpendingChartProps) => {
  // Group transactions by month
  const monthlyData = transactions.reduce((acc: any, transaction) => {
    const date = new Date(transaction.date);
    const monthKey = date.toLocaleDateString("en-US", { month: "short" });
    
    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthKey, expenses: 0, investments: 0 };
    }
    
    if (transaction.type === "expense") {
      acc[monthKey].expenses += Number(transaction.amount);
    } else if (transaction.type === "investment") {
      acc[monthKey].investments += Number(transaction.amount);
    }
    
    return acc;
  }, {});

  const data = Object.values(monthlyData).slice(0, 6);

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <CardHeader>
        <CardTitle>Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="month" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
            />
            <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} />
            <Bar dataKey="investments" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
