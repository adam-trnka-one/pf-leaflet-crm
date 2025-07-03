import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import { useIsMobile } from "@/hooks/use-mobile";
import Layout from "./components/Layout";
import Hero from "./pages/Hero";
import Help from "./pages/Help";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import AccountDetail from "./pages/AccountDetail";
import Contacts from "./pages/Contacts";
import ContactDetail from "./pages/ContactDetail";
import Leads from "./pages/Leads";
import Opportunities from "./pages/Opportunities";
import Activities from "./pages/Activities";
import Cases from "./pages/Cases";
import Users from "./pages/Users";
import Products from "./pages/Products";
import PublicProducts from "./pages/PublicProducts";
import Quotes from "./pages/Quotes";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const MobileRedirect = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileRedirect><Hero /></MobileRedirect>} />
          <Route path="/products" element={<MobileRedirect><PublicProducts /></MobileRedirect>} />
          <Route path="/help" element={<Help />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/login" element={<MobileRedirect><Login /></MobileRedirect>} />
          <Route path="/dashboard" element={
            <WorkspaceProvider>
              <Layout />
            </WorkspaceProvider>
          }>
            <Route index element={<Dashboard />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="accounts/:id" element={<AccountDetail />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="contacts/:id" element={<ContactDetail />} />
            <Route path="leads" element={<Leads />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="activities" element={<Activities />} />
            <Route path="cases" element={<Cases />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="quotes" element={<Quotes />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
