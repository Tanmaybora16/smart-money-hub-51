import { Home, Receipt, TrendingUp, BarChart3, Settings, Plus, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddTransaction: () => void;
  onLogout: () => void;
}

const Sidebar = ({ activeTab, onTabChange, onAddTransaction, onLogout }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "transactions", label: "Transactions", icon: Receipt },
    { id: "investments", label: "Investments", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="h-full bg-card border-r border-border flex flex-col overflow-y-auto">
      <div className="p-4 lg:p-6">
        <h1 className="text-xl lg:text-2xl font-bold gradient-primary bg-clip-text text-transparent">
          FinanceTracker
        </h1>
      </div>

      <div className="px-4 lg:px-6 mb-4">
        <Button 
          onClick={onAddTransaction} 
          className="w-full shadow-glow hover:scale-105 transition-transform"
          size="default"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      <nav className="flex-1 px-3 lg:px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm lg:text-base">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 lg:p-6 space-y-4">
        <Separator />
        <Button 
          variant="outline" 
          onClick={onLogout} 
          className="w-full"
          size="default"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
        
        <div className="p-3 lg:p-4 bg-accent/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Pro Tip:</span> Track daily expenses for better insights!
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
