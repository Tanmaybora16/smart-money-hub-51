import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const BudgetProgress = () => {
  const budgets = [
    { category: "Food & Dining", spent: 450, budget: 600, color: "hsl(var(--warning))" },
    { category: "Shopping", spent: 890, budget: 1000, color: "hsl(var(--primary))" },
    { category: "Transportation", spent: 180, budget: 300, color: "hsl(var(--accent))" },
    { category: "Entertainment", spent: 320, budget: 400, color: "hsl(var(--success))" }
  ];

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <CardHeader>
        <CardTitle>Budget Tracking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {budgets.map((item) => {
          const percentage = (item.spent / item.budget) * 100;
          const isNearLimit = percentage > 80;
          
          return (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.category}</span>
                <span className={`font-semibold ${isNearLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                  ${item.spent} / ${item.budget}
                </span>
              </div>
              <Progress 
                value={percentage} 
                className="h-2"
                style={{
                  // @ts-ignore
                  '--progress-background': item.color
                }}
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{percentage.toFixed(0)}% used</span>
                <span>${item.budget - item.spent} remaining</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
