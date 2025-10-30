import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import RecentTransactions from "@/components/RecentTransactions";
import SpendingChart from "@/components/SpendingChart";
import BudgetProgress from "@/components/BudgetProgress";
import InvestmentPortfolio from "@/components/InvestmentPortfolio";
import TransactionForm, { Transaction } from "@/components/TransactionForm";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    setLoadingTransactions(true);
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      toast({
        title: "Error loading transactions",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // Transform database schema to match component interface
      const transformedData = (data || []).map((t: any) => ({
        ...t,
        paymentMethod: t.payment_method,
      }));
      setTransactions(transformedData);
    }
    setLoadingTransactions(false);
  };

  const handleAddTransaction = async (transaction: Transaction) => {
    // Transform to database schema
    const dbTransaction = {
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      payment_method: transaction.paymentMethod,
      description: transaction.description,
      date: transaction.date,
      user_id: user?.id,
    };

    const { data, error } = await supabase
      .from("transactions")
      .insert([dbTransaction])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error adding transaction",
        description: error.message,
        variant: "destructive",
      });
    } else {
      const transformedData = {
        ...data,
        paymentMethod: data.payment_method,
        type: data.type as "expense" | "investment" | "income",
      };
      setTransactions([transformedData, ...transactions]);
      toast({
        title: "Transaction added!",
        description: "Your transaction has been saved successfully.",
      });
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error deleting transaction",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setTransactions(transactions.filter(t => t.id !== id));
      toast({
        title: "Transaction deleted",
        description: "Your transaction has been removed.",
      });
    }
  };

  const handleClearAllTransactions = async () => {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("user_id", user?.id);

    if (error) {
      toast({
        title: "Error clearing transactions",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setTransactions([]);
      toast({
        title: "All transactions cleared",
        description: "Your transaction history has been cleared.",
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  const getFilteredTransactions = () => {
    if (selectedMonth === "all") return transactions;
    
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const [year, month] = selectedMonth.split("-");
      return transactionDate.getFullYear() === parseInt(year) && 
             transactionDate.getMonth() === parseInt(month);
    });
  };

  const filteredTransactions = getFilteredTransactions();

  // Get unique months from transactions
  const getAvailableMonths = () => {
    const months = new Set<string>();
    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      months.add(monthKey);
    });
    return Array.from(months).sort().reverse();
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <h1 className="text-xl font-bold">FinanceTracker</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-accent rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block fixed lg:sticky top-0 left-0 h-screen w-full lg:w-64 z-50 lg:z-auto`}>
          <Sidebar
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setIsMobileMenuOpen(false);
            }}
            onAddTransaction={() => {
              setIsFormOpen(true);
              setIsMobileMenuOpen(false);
            }}
            onLogout={handleLogout}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground text-sm lg:text-base">Welcome back! Here's your financial overview.</p>
                  </div>
                </div>
                <Dashboard transactions={filteredTransactions} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SpendingChart transactions={filteredTransactions} />
                  <BudgetProgress transactions={filteredTransactions} />
                </div>
                <RecentTransactions 
                  transactions={filteredTransactions} 
                  onDelete={handleDeleteTransaction}
                />
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h1 className="text-2xl lg:text-3xl font-bold">Transactions</h1>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="px-4 py-2 rounded-md border border-input bg-background"
                  >
                    <option value="all">All Months</option>
                    {getAvailableMonths().map(monthKey => {
                      const [year, month] = monthKey.split("-");
                      const date = new Date(parseInt(year), parseInt(month));
                      return (
                        <option key={monthKey} value={monthKey}>
                          {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <RecentTransactions 
                  transactions={filteredTransactions} 
                  onDelete={handleDeleteTransaction}
                  showAll 
                />
              </div>
            )}

            {activeTab === "investments" && (
              <div className="space-y-6">
                <h1 className="text-2xl lg:text-3xl font-bold">Investment Portfolio</h1>
                <InvestmentPortfolio transactions={filteredTransactions} />
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <h1 className="text-2xl lg:text-3xl font-bold">Analytics</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SpendingChart transactions={filteredTransactions} />
                  <InvestmentPortfolio transactions={filteredTransactions} />
                </div>
                <BudgetProgress transactions={filteredTransactions} />
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h1 className="text-2xl lg:text-3xl font-bold">Settings</h1>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h2 className="text-xl font-semibold mb-4">Data Management</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Clear all your transaction history. This action cannot be undone.
                      </p>
                      <button
                        onClick={handleClearAllTransactions}
                        className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
                      >
                        Clear All Transactions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <TransactionForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
};

export default Index;
