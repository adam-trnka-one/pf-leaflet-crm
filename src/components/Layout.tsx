import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutDashboard, Users, Contact, UserPlus, Target, Activity, HelpCircle, Package, FileText, Settings, LogOut, Search, Newspaper, RefreshCw, Loader2 } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { useProductFruits } from "@/contexts/ProductFruitsContext";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";

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

const LayoutContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile, setOpenMobile } = useSidebar();
  const newsfeedRef = useRef<HTMLButtonElement>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const { t } = useTranslation();
  const { state: pfState, initializeProductFruits, resetProductFruitsState } = useProductFruits();
  
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
    // Reset ProductFruits state via context
    resetProductFruitsState();
    
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

  const handleReloadProductFruits = async () => {
    console.log('[Layout] Manual ProductFruits reload triggered');
    await initializeProductFruits(undefined, true);
  };

  // Setup ProductFruits newsfeed listener with retry
  useEffect(() => {
    const setupNewsfeedListener = () => {
      if ((window as any).productFruits?.api?.announcementsV2) {
        (window as any).productFruits.api.announcementsV2.listen('newsfeed-unread-count-changed', (data: { count: number }) => {
          setUnreadCount(data.count);
        });
        return true;
      }
      return false;
    };

    // Try immediately
    if (!setupNewsfeedListener()) {
      // Retry after ProductFruits may be ready
      const retryInterval = setInterval(() => {
        if (setupNewsfeedListener()) {
          clearInterval(retryInterval);
        }
      }, 1000);

      // Clean up after 10 seconds
      setTimeout(() => clearInterval(retryInterval), 10000);
    }
  }, []);

  const handleNewsfeedClick = () => {
    if (newsfeedRef.current && (window as any).productFruits?.api?.announcementsV2) {
      (window as any).productFruits.api.announcementsV2.attachNewsWidgetToElement(newsfeedRef.current);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-slate-50">
      <div className="flex flex-1">
        <Sidebar className="w-72">
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
                  const translationKey = `nav.${item.name.toLowerCase()}`;
                  return <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={t(translationKey)} className="h-11 px-4 rounded-lg text-sm font-medium">
                          <Link to={item.href} onClick={handleNavClick}>
                            <Icon className="h-5 w-5" />
                            <span>{t(translationKey)}</span>
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
                <Input placeholder={t('common.search')} className="pl-10 rtl:pl-3 rtl:pr-10 bg-slate-50 border-slate-200 focus:bg-white" />
              </div>
              <LanguageSelector />
              
              {/* ProductFruits Loading Indicator */}
              {pfState.status === 'loading' && (
                <div className="flex items-center gap-1 text-amber-600 text-xs">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span className="hidden sm:inline">Loading PF...</span>
                </div>
              )}
              
              {/* Reload ProductFruits Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleReloadProductFruits}
                className="h-8 w-8"
                title="Reload ProductFruits"
                disabled={pfState.status === 'loading'}
              >
                <RefreshCw className={`h-4 w-4 ${pfState.status === 'loading' ? 'animate-spin' : ''}`} />
              </Button>
              
              <Button 
                ref={newsfeedRef}
                variant="ghost" 
                size="icon" 
                onClick={handleNewsfeedClick}
                className="h-8 w-8 relative"
                title="Newsfeed"
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
                title={t('common.signOut')}
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
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default Layout;
