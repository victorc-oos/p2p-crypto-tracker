
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import PaymentMethodsList from "./components/payment-methods/PaymentMethodsList";
import PaymentMethodForm from "./components/payment-methods/PaymentMethodForm";
import TransactionsList from "./components/transactions/TransactionsList";
import TransactionForm from "./components/transactions/TransactionForm";
import StatisticsView from "./components/stats/StatisticsView";
import GoalsList from "./components/goals/GoalsList";
import GoalForm from "./components/goals/GoalForm";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/payment-methods" element={<PaymentMethodsList />} />
                <Route path="/payment-methods/new" element={<PaymentMethodForm />} />
                <Route path="/payment-methods/:id" element={<PaymentMethodForm />} />
                <Route path="/transactions" element={<TransactionsList />} />
                <Route path="/transactions/new" element={<TransactionForm />} />
                <Route path="/transactions/:id/edit" element={<TransactionForm />} />
                <Route path="/statistics" element={<StatisticsView />} />
                <Route path="/goals" element={<GoalsList />} />
                <Route path="/goals/new" element={<GoalForm />} />
                <Route path="/goals/:id/edit" element={<GoalForm />} />
                <Route path="/settings" element={<Settings isDarkMode={false} toggleDarkMode={() => {}} />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
