import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, ShoppingBag, Home, Utensils, Plane, TrendingUp, Coffee, Car, Wallet } from "lucide-react";
import { Transaction } from "./TransactionForm";

interface RecentTransactionsProps {
  transactions: Transaction[];
  showAll?: boolean;
}

const RecentTransactions = ({ transactions, showAll = false }: RecentTransactionsProps) => {
  const displayTransactions = showAll ? transactions : transactions.slice(0, 5);

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, any> = {
      "Food & Dining": Utensils,
      "Shopping": ShoppingBag,
      "Transportation": Car,
      "Bills & Utilities": Home,
      "Entertainment": Plane,
      "Salary": TrendingUp,
      "Freelance": Wallet,
      "Stocks": TrendingUp,
      "Mutual Funds": TrendingUp,
      "Crypto": TrendingUp,
      "Coffee": Coffee,
    };
    return iconMap[category] || ShoppingBag;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>{showAll ? "All Transactions" : "Recent Transactions"}</CardTitle>
      </CardHeader>
      <CardContent>
        {displayTransactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No transactions yet. Click "Add Transaction" to get started.
          </div>
        ) : (
          <div className="space-y-4">
            {displayTransactions.map((transaction) => {
              const Icon = getCategoryIcon(transaction.category);
              const isExpense = transaction.type === "expense";
              const isIncome = transaction.type === "income";
              
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-secondary ${
                      isIncome ? "text-success" : isExpense ? "text-destructive" : "text-primary"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {transaction.paymentMethod}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{formatDate(transaction.date)}</span>
                      </div>
                      {transaction.description && (
                        <p className="text-xs text-muted-foreground mt-1">{transaction.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {isExpense ? (
                      <ArrowDownRight className="h-4 w-4 mr-1 text-destructive" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 mr-1 text-success" />
                    )}
                    <span className={`font-semibold ${isExpense ? 'text-destructive' : 'text-success'}`}>
                      {isExpense ? "-" : "+"}₹{transaction.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
