import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutDashboard, Users, Contact, UserPlus, Target, Activity, HelpCircle, Package, FileText, Settings, LogOut, Search, Newspaper, Loader2, RotateCcw } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useLanguageSync } from "@/hooks/useLanguageSync";
import { useWorkspaceForm } from "@/hooks/useWorkspaceForm";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useRef, useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { RTL_LANGUAGES } from "@/i18n";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import BottomNav from "@/components/BottomNav";

const LayoutContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile, setOpenMobile } = useSidebar();
  const newsfeedRef = useRef<HTMLButtonElement>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isInitiating, setIsInitiating] = useState(false);
  const [isPFActive, setIsPFActive] = useState(false);
  const { t } = useTranslation('navigation');
  const { localWorkspaceData, setLocalWorkspaceData, handleInitiateProductFruits, handleResetToDefaults } = useWorkspaceForm();
  const { updateWorkspaceData } = useWorkspace();
  
  // Sync language with workspace settings
  useLanguageSync();

  const languageNames: Record<string, string> = {
    en: 'English',
    cs: 'Čeština',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
    pt: 'Português',
    ar: 'العربية'
  };

  const handleLanguageChangeAndInitiate = async (value: string) => {
    setLocalWorkspaceData(prev => ({ ...prev, languageCode: value }));
    setIsInitiating(true);
    
    toast({
      title: "Changing language...",
      description: `Switching to ${languageNames[value]} and initializing ProductFruits`,
    });

    try {
      // Update workspace context directly with new language
      updateWorkspaceData({ languageCode: value });
      await handleInitiateProductFruits();
      setTimeout(() => {
        window.location.href = window.location.pathname;
      }, 500);
    } catch (error) {
      console.error('Error in save and initiate:', error);
      toast({
        title: "Error",
        description: "Failed to change language",
        variant: "destructive"
      });
    } finally {
      setIsInitiating(false);
    }
  };

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
    // 1. Destroy ProductFruits instance via official SDK
    if ((window as any).productFruits?.services?.destroy) {
      (window as any).productFruits.services.destroy();
    }

    // 2. Remove ProductFruits scripts
    const existingScripts = document.querySelectorAll('script[data-productfruits-init], script[src*="productfruits"], script[src*="pf.dev"], script[src*="/static/script.js"]');
    existingScripts.forEach(script => script.remove());

    // 3. Clear ProductFruits global objects
    if ((window as any).$productFruits) {
      delete (window as any).$productFruits;
    }
    if ((window as any).productFruits) {
      delete (window as any).productFruits;
    }

    // 4. Navigate to login
    navigate("/login");
  };

  // Check ProductFruits active status
  useEffect(() => {
  const checkPFStatus = () => {
      const active = !!(window as any).productFruits?.services;
      setIsPFActive(prev => prev === active ? prev : active);
    };
    checkPFStatus();
    const interval = setInterval(checkPFStatus, 5000);
    return () => clearInterval(interval);
  }, []);

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
            <div className="px-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Version 1.0.{Date.now().toString().slice(-6)}</p>
                <Badge 
                  variant={isPFActive ? "default" : "secondary"}
                  className={cn(
                    "text-[10px] px-1.5 py-0",
                    isPFActive 
                      ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-100" 
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <span className={cn("inline-block w-1.5 h-1.5 rounded-full mr-1", isPFActive ? "bg-green-500" : "bg-muted-foreground")} />
                  PF: {isPFActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              {localWorkspaceData.selectedWorkspace !== 'jess' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-7 text-xs"
                    onClick={async () => {
                    handleResetToDefaults();
                    await handleInitiateProductFruits();
                    setTimeout(() => {
                      window.location.href = '/dashboard';
                    }, 500);
                  }}
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset to Default
                </Button>
              )}
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-auto min-h-[64px] sm:h-[89px] shrink-0 items-center justify-between gap-2 sm:gap-6 border-b px-3 sm:px-6 bg-white py-2 sm:py-0">
            <div className="flex items-center gap-2 sm:gap-4">
              <SidebarTrigger className="-ml-1" data-testid="sidebar-trigger" />
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1 hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 rtl:left-auto rtl:right-3" />
                <Input 
                  placeholder={t('header.searchPlaceholder')} 
                  className="pl-10 rtl:pl-3 rtl:pr-10 bg-slate-50 border-slate-200 focus:bg-white" 
                  data-testid="header-search-input"
                />
              </div>
              
              <div className="flex items-center gap-1" data-testid="language-selector-container">
                <Select value={localWorkspaceData.languageCode} onValueChange={handleLanguageChangeAndInitiate} disabled={isInitiating}>
                  <SelectTrigger className="w-12 sm:w-36 h-8 bg-white" title="Select language" data-testid="language-selector-trigger">
                    {isInitiating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <SelectValue />
                    )}
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50 min-w-[160px]" data-testid="language-selector-content">
                    <SelectItem value="en" data-testid="language-option-en">🇬🇧 English</SelectItem>
                    <SelectItem value="cs" data-testid="language-option-cs">🇨🇿 Čeština</SelectItem>
                    <SelectItem value="de" data-testid="language-option-de">🇩🇪 Deutsch</SelectItem>
                    <SelectItem value="fr" data-testid="language-option-fr">🇫🇷 Français</SelectItem>
                    <SelectItem value="es" data-testid="language-option-es">🇪🇸 Español</SelectItem>
                    <SelectItem value="pt" data-testid="language-option-pt">🇵🇹 Português</SelectItem>
                    <SelectItem value="ar" data-testid="language-option-ar">🇸🇦 العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                ref={newsfeedRef}
                variant="ghost" 
                size="icon" 
                onClick={handleNewsfeedClick}
                className="h-8 w-8 relative"
                title={t('header.newsfeed')}
                id="newsfeed-launcher"
                data-testid="newsfeed-button"
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
                data-testid="signout-button"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 sm:p-6 pb-20 sm:pb-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
      <BottomNav />
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