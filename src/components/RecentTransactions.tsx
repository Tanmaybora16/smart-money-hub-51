import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, ShoppingBag, Home, Utensils, Plane, TrendingUp } from "lucide-react";

const RecentTransactions = () => {
  const transactions = [
    {
      id: 1,
      type: "expense",
      category: "Shopping",
      description: "Amazon Purchase",
      amount: -125.50,
      date: "Today, 2:30 PM",
      icon: ShoppingBag,
      color: "text-primary"
    },
    {
      id: 2,
      type: "investment",
      category: "Stocks",
      description: "AAPL Investment",
      amount: 500.00,
      date: "Today, 10:15 AM",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      id: 3,
      type: "expense",
      category: "Food",
      description: "Restaurant Dinner",
      amount: -85.00,
      date: "Yesterday, 7:45 PM",
      icon: Utensils,
      color: "text-warning"
    },
    {
      id: 4,
      type: "expense",
      category: "Bills",
      description: "Electricity Bill",
      amount: -150.00,
      date: "Yesterday, 3:20 PM",
      icon: Home,
      color: "text-accent"
    },
    {
      id: 5,
      type: "expense",
      category: "Travel",
      description: "Flight Booking",
      amount: -420.00,
      date: "2 days ago",
      icon: Plane,
      color: "text-destructive"
    }
  ];

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-secondary ${transaction.color}`}>
                  <transaction.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{transaction.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {transaction.amount < 0 ? (
                  <ArrowDownRight className="h-4 w-4 mr-1 text-destructive" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 mr-1 text-success" />
                )}
                <span className={`font-semibold ${transaction.amount < 0 ? 'text-destructive' : 'text-success'}`}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
