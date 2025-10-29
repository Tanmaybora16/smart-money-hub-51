import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Transaction } from "./TransactionForm";

interface BudgetProgressProps {
  transactions: Transaction[];
}

const BudgetProgress = ({ transactions }: BudgetProgressProps) => {
  // Calculate spending by category
  const categorySpending = transactions
    .filter(t => t.type === "expense")
    .reduce((acc: any, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + Number(transaction.amount);
      return acc;
    }, {});

  // Define budgets for categories
  const budgetMap: Record<string, number> = {
    "Food & Dining": 600,
    "Shopping": 1000,
    "Transportation": 300,
    "Entertainment": 400,
    "Bills & Utilities": 500,
    "Healthcare": 300,
  };

  const budgets = Object.entries(categorySpending)
    .slice(0, 4)
    .map(([category, spent]) => ({
      category,
      spent: Number(spent),
      budget: budgetMap[category] || 500,
      color: "hsl(var(--primary))",
    }));

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <CardHeader>
        <CardTitle>Budget Tracking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {budgets.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No expense data yet. Start adding transactions!
          </p>
        ) : (
          budgets.map((item) => {
            const percentage = (item.spent / item.budget) * 100;
            const isNearLimit = percentage > 80;
            
            return (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.category}</span>
                  <span className={`font-semibold ${isNearLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                    ${item.spent.toFixed(2)} / ${item.budget}
                  </span>
                </div>
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className="h-2"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{percentage.toFixed(0)}% used</span>
                  <span>${Math.max(0, item.budget - item.spent).toFixed(2)} remaining</span>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
