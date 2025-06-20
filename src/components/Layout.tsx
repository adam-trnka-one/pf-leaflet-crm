
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Contact, 
  UserPlus, 
  Target, 
  Activity, 
  HelpCircle, 
  Package, 
  FileText, 
  Settings,
  Menu,
  X,
  LogOut
} from "lucide-react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Accounts", href: "/accounts", icon: Users },
    { name: "Contacts", href: "/contacts", icon: Contact },
    { name: "Leads", href: "/leads", icon: UserPlus },
    { name: "Opportunities", href: "/opportunities", icon: Target },
    { name: "Activities", href: "/activities", icon: Activity },
    { name: "Cases", href: "/cases", icon: HelpCircle },
    { name: "Users", href: "/users", icon: Users },
    { name: "Products", href: "/products", icon: Package },
    { name: "Quotes", href: "/quotes", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-bold text-xl text-slate-800">Leaflet CRM</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-600 hover:text-slate-800"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-emerald-100 text-emerald-700 border-l-4 border-emerald-500'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link
            to="/login"
            className="flex items-center space-x-3 px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="font-medium">Sign Out</span>}
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
