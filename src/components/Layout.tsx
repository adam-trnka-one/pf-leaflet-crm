import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutDashboard, Users, Contact, UserPlus, Target, Activity, HelpCircle, Package, FileText, Settings, LogOut, Search } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { useProductFruits } from "@/hooks/useProductFruits";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useProductFruits(); // Initialize ProductFruits with workspace data
  
  const navigation = [{
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  }, {
    name: "Accounts",
    href: "/dashboard/accounts",
    icon: Users
  }, {
    name: "Contacts",
    href: "/dashboard/contacts",
    icon: Contact
  }, {
    name: "Leads",
    href: "/dashboard/leads",
    icon: UserPlus
  }, {
    name: "Opportunities",
    href: "/dashboard/opportunities",
    icon: Target
  }, {
    name: "Activities",
    href: "/dashboard/activities",
    icon: Activity
  }, {
    name: "Cases",
    href: "/dashboard/cases",
    icon: HelpCircle
  }, {
    name: "Users",
    href: "/dashboard/users",
    icon: Users
  }, {
    name: "Products",
    href: "/dashboard/products",
    icon: Package
  }, {
    name: "Quotes",
    href: "/dashboard/quotes",
    icon: FileText
  }, {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings
  }];
  const isActive = (href: string) => {
    if (href === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(href);
  };

  const handleSignOut = () => {
    // Remove ProductFruits script
    const existingScript = document.querySelector('script[data-productfruits-init]');
    if (existingScript) {
      existingScript.remove();
    }

    // Clear ProductFruits global object
    if ((window as any).$productFruits) {
      delete (window as any).$productFruits;
    }

    // Navigate to home page and refresh
    navigate("/");
    window.location.reload();
  };

  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <Sidebar className="w-72">
          <SidebarHeader className="border-b border-sidebar-border px-4 py-[18px]">
            <div className="flex items-center pl-[15px] py-[10px]">
              <Link to="/dashboard" className="hover:opacity-80 transition-opacity">
                <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
              </Link>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigation.map(item => {
                  const Icon = item.icon;
                  return <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.name} className="h-11 px-4 rounded-lg text-sm font-medium">
                          <Link to={item.href}>
                            <Icon className="h-5 w-5" />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>;
                })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border p-4">
            <div className="mb-3 px-4">
              <p className="text-xs text-slate-500">Version 1.0.{Date.now().toString().slice(-6)}</p>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Sign Out" 
                  className="h-11 px-4 rounded-lg text-sm font-medium"
                  onClick={handleSignOut}
                >
                  <button>
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-[89px] shrink-0 items-center justify-between gap-6 border-b px-6 bg-white py-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1" />
            </div>
            
            <div className="w-3/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search accounts, contacts, opportunities..." className="pl-10 bg-slate-50 border-slate-200 focus:bg-white" />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>;
};

export default Layout;
