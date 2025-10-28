import { LayoutDashboard, Receipt, TrendingUp, PieChart, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
const Sidebar = ({
  activeTab,
  onTabChange
}: SidebarProps) => {
  const menuItems = [{
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  }, {
    id: "transactions",
    label: "Transactions",
    icon: Receipt
  }, {
    id: "investments",
    label: "Investments",
    icon: TrendingUp
  }, {
    id: "analytics",
    label: "Analytics",
    icon: PieChart
  }, {
    id: "settings",
    label: "Settings",
    icon: Settings
  }];
  return <div className="w-64 border-r bg-card h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold gradient-primary bg-clip-text text-slate-950">
          FinanceTracker
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Smart Money Management</p>
      </div>

      <div className="flex-1 p-4 space-y-2">
        <Button className="w-full justify-start gap-3 mb-4 gradient-primary text-white hover:opacity-90" size="lg">
          <Plus className="h-5 w-5" />
          Add Transaction
        </Button>

        {menuItems.map(item => <Button key={item.id} variant={activeTab === item.id ? "secondary" : "ghost"} className={cn("w-full justify-start gap-3 transition-all", activeTab === item.id && "bg-primary/10 text-primary hover:bg-primary/15")} onClick={() => onTabChange(item.id)}>
            <item.icon className="h-5 w-5" />
            {item.label}
          </Button>)}
      </div>

      <div className="p-4 border-t">
        <div className="p-4 rounded-lg bg-gradient-card text-white">
          <p className="text-sm font-medium">Pro Tip</p>
          <p className="text-xs mt-1 text-white/80">
            Set monthly budgets to track your spending better
          </p>
        </div>
      </div>
    </div>;
};
export default Sidebar;