import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import RecentTransactions from "@/components/RecentTransactions";
import SpendingChart from "@/components/SpendingChart";
import BudgetProgress from "@/components/BudgetProgress";
import InvestmentPortfolio from "@/components/InvestmentPortfolio";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-7xl">
          {activeTab === "dashboard" && (
            <>
              <Dashboard />
              
              <div className="grid gap-6 mt-6 lg:grid-cols-2">
                <SpendingChart />
                <BudgetProgress />
              </div>

              <div className="grid gap-6 mt-6 lg:grid-cols-2">
                <RecentTransactions />
                <InvestmentPortfolio />
              </div>
            </>
          )}

          {activeTab === "transactions" && (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold mb-6">All Transactions</h1>
              <RecentTransactions />
            </div>
          )}

          {activeTab === "investments" && (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold mb-6">Investment Portfolio</h1>
              <div className="grid gap-6 lg:grid-cols-2">
                <InvestmentPortfolio />
                <SpendingChart />
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold mb-6">Financial Analytics</h1>
              <div className="grid gap-6">
                <SpendingChart />
                <div className="grid gap-6 lg:grid-cols-2">
                  <BudgetProgress />
                  <InvestmentPortfolio />
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold mb-6">Settings</h1>
              <div className="bg-card rounded-lg p-8 text-center">
                <p className="text-muted-foreground">Settings page coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
