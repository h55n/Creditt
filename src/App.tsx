import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./contexts/AuthContext";
import { CredentialProvider } from "./contexts/CredentialContext";
import "./i18n/config";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Credentials from "./pages/Credentials";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerVerify from "./pages/EmployerVerify";
import EmployerSearch from "./pages/EmployerSearch";
import EmployerBulkVerify from "./pages/EmployerBulkVerify";
import CandidateProfile from "./pages/CandidateProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthProvider>
          <CredentialProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/credentials" element={<Credentials />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/employer-dashboard" element={<EmployerDashboard />} />
                  <Route path="/employer-verify" element={<EmployerVerify />} />
                  <Route path="/employer-search" element={<EmployerSearch />} />
                  <Route path="/employer-bulk-verify" element={<EmployerBulkVerify />} />
                  <Route path="/employer-candidate/:userId" element={<CandidateProfile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CredentialProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
