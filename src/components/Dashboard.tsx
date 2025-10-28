import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, CreditCard, PiggyBank } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Balance",
      value: "$45,280.00",
      change: "+12.5%",
      trend: "up",
      icon: Wallet,
      gradient: true
    },
    {
      title: "Monthly Expenses",
      value: "$8,420.00",
      change: "-3.2%",
      trend: "down",
      icon: CreditCard
    },
    {
      title: "Investments",
      value: "$32,150.00",
      change: "+8.4%",
      trend: "up",
      icon: TrendingUp
    },
    {
      title: "Savings",
      value: "$12,340.00",
      change: "+15.3%",
      trend: "up",
      icon: PiggyBank
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Overview</h1>
          <p className="text-muted-foreground mt-1">Track your expenses and investments in one place</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className={`overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] ${
              stat.gradient ? 'gradient-card text-white border-0' : ''
            } animate-slide-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className={`text-sm font-medium ${stat.gradient ? 'text-white/90' : ''}`}>
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.gradient ? 'text-white/90' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className={`h-4 w-4 mr-1 ${stat.gradient ? 'text-white/90' : 'text-success'}`} />
                ) : (
                  <ArrowDownRight className={`h-4 w-4 mr-1 ${stat.gradient ? 'text-white/90' : 'text-destructive'}`} />
                )}
                <span className={stat.gradient ? 'text-white/90' : stat.trend === 'up' ? 'text-success' : 'text-destructive'}>
                  {stat.change}
                </span>
                <span className={`ml-1 ${stat.gradient ? 'text-white/70' : 'text-muted-foreground'}`}>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
