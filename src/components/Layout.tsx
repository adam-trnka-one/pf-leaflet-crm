import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutDashboard, Users, Contact, UserPlus, Target, Activity, HelpCircle, Package, FileText, Settings, LogOut, Search, Newspaper } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { useProductFruits } from "@/hooks/useProductFruits";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import { useRef, useEffect, useState } from "react";
import { RTL_LANGUAGES } from "@/i18n";

const LayoutContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile, setOpenMobile } = useSidebar();
  const newsfeedRef = useRef<HTMLButtonElement>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const { t } = useTranslation('navigation');
  
  // Sync language with workspace settings
  useLanguageSync();

  const navigation = [
    { name: t('items.dashboard'), href: "/dashboard", icon: LayoutDashboard },
    { name: t('items.accounts'), href: "/dashboard/accounts", icon: Users },
    { name: t('items.contacts'), href: "/dashboard/contacts", icon: Contact },
    { name: t('items.leads'), href: "/dashboard/leads", icon: UserPlus },
    { name: t('items.opportunities'), href: "/dashboard/opportunities", icon: Target },
    { name: t('items.activities'), href: "/dashboard/activities", icon: Activity },
    { name: t('items.cases'), href: "/dashboard/cases", icon: HelpCircle },
    { name: t('items.users'), href: "/dashboard/users", icon: Users },
    { name: t('items.products'), href: "/dashboard/products", icon: Package },
    { name: t('items.quotes'), href: "/dashboard/quotes", icon: FileText },
    { name: t('items.settings'), href: "/dashboard/settings", icon: Settings }
  ];
  
  const isActive = (href: string) => {
    if (href === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(href);
  };

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
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

  // Setup ProductFruits newsfeed
  useEffect(() => {
    // Listen for unread count changes
    if ((window as any).productFruits?.api?.announcementsV2) {
      (window as any).productFruits.api.announcementsV2.listen('newsfeed-unread-count-changed', (data: { count: number }) => {
        setUnreadCount(data.count);
      });
    }
  }, []);

  const handleNewsfeedClick = () => {
    if (newsfeedRef.current && (window as any).productFruits?.api?.announcementsV2) {
      (window as any).productFruits.api.announcementsV2.attachNewsWidgetToElement(newsfeedRef.current);
    }
  };

  const { i18n } = useTranslation();
  const isRTL = RTL_LANGUAGES.includes(i18n.language);

  return (
    <div className="min-h-screen flex flex-col w-full bg-slate-50">
      <div className="flex flex-1 w-full">
        <Sidebar className="w-72" side={isRTL ? "right" : "left"}>
          <SidebarHeader className="border-b border-sidebar-border px-4 py-[18px]">
            <div className="flex items-center pl-[15px] py-[10px]">
              <Link to="/dashboard" className="hover:opacity-80 transition-opacity" onClick={handleNavClick}>
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
                  return <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.name} className="h-11 px-4 rounded-lg text-sm font-medium">
                          <Link to={item.href} onClick={handleNavClick}>
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
            <div className="px-4">
              <p className="text-xs text-slate-500">Version 1.0.{Date.now().toString().slice(-6)}</p>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-[89px] shrink-0 items-center justify-between gap-6 border-b px-6 bg-white py-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1" />
            </div>
            
            <div className="flex items-center gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 rtl:left-auto rtl:right-3" />
                <Input placeholder={t('header.searchPlaceholder')} className="pl-10 rtl:pl-3 rtl:pr-10 bg-slate-50 border-slate-200 focus:bg-white" />
              </div>
              <Button 
                ref={newsfeedRef}
                variant="ghost" 
                size="icon" 
                onClick={handleNewsfeedClick}
                className="h-8 w-8 relative"
                title={t('header.newsfeed')}
                id="newsfeed-launcher"
              >
                <Newspaper className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSignOut}
                className="h-8 w-8"
                title={t('header.signOut')}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </div>
  );
};

const Layout = () => {
  useProductFruits(); // Initialize ProductFruits with workspace data
  
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default Layout;
