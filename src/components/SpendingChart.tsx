import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SpendingChart = () => {
  const data = [
    { month: "Jan", expenses: 2400, investments: 1800 },
    { month: "Feb", expenses: 1398, investments: 2200 },
    { month: "Mar", expenses: 3800, investments: 1600 },
    { month: "Apr", expenses: 3908, investments: 2800 },
    { month: "May", expenses: 4800, investments: 3200 },
    { month: "Jun", expenses: 3800, investments: 2900 }
  ];

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
