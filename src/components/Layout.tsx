import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutDashboard, Users, Contact, UserPlus, Target, Activity, HelpCircle, Package, FileText, Settings, LogOut, Search } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";

const Layout = () => {
  const location = useLocation();
  
  const navigation = [{
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard
  }, {
    name: "Accounts",
    href: "/accounts",
    icon: Users
  }, {
    name: "Contacts",
    href: "/contacts",
    icon: Contact
  }, {
    name: "Leads",
    href: "/leads",
    icon: UserPlus
  }, {
    name: "Opportunities",
    href: "/opportunities",
    icon: Target
  }, {
    name: "Activities",
    href: "/activities",
    icon: Activity
  }, {
    name: "Cases",
    href: "/cases",
    icon: HelpCircle
  }, {
    name: "Users",
    href: "/users",
    icon: Users
  }, {
    name: "Products",
    href: "/products",
    icon: Package
  }, {
    name: "Quotes",
    href: "/quotes",
    icon: FileText
  }, {
    name: "Settings",
    href: "/settings",
    icon: Settings
  }];
  
  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <Sidebar className="w-72">
          <SidebarHeader className="border-b border-sidebar-border p-6 py-[20px]">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                Leaflet CRM
              </span>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-semibold text-sidebar-foreground/80 mb-3">
                Navigation
              </SidebarGroupLabel>
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
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Sign Out" className="h-11 px-4 rounded-lg text-sm font-medium">
                  <Link to="/login">
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-24 shrink-0 items-center justify-between gap-6 border-b px-6 bg-white">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1" />
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search accounts, contacts, opportunities..." className="pl-10 bg-slate-50 border-slate-200 focus:bg-white" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-slate-600">
                <span className="sr-only">Notifications</span>
                🔔
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-600">
                <span className="sr-only">Profile</span>
                👤
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
