import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LayoutDashboard, Users, Contact, UserPlus, Target, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Activity, HelpCircle, Package, FileText, Settings } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation('navigation');

  const mainNavItems = [
    { name: t('items.dashboard'), href: "/dashboard", icon: LayoutDashboard },
    { name: t('items.accounts'), href: "/dashboard/accounts", icon: Users },
    { name: t('items.contacts'), href: "/dashboard/contacts", icon: Contact },
    { name: t('items.leads'), href: "/dashboard/leads", icon: UserPlus },
    { name: t('items.opportunities'), href: "/dashboard/opportunities", icon: Target },
  ];

  const moreNavItems = [
    { name: t('items.activities'), href: "/dashboard/activities", icon: Activity },
    { name: t('items.cases'), href: "/dashboard/cases", icon: HelpCircle },
    { name: t('items.users'), href: "/dashboard/users", icon: Users },
    { name: t('items.products'), href: "/dashboard/products", icon: Package },
    { name: t('items.quotes'), href: "/dashboard/quotes", icon: FileText },
    { name: t('items.settings'), href: "/dashboard/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(href);
  };

  const isMoreActive = moreNavItems.some(item => isActive(item.href));

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 sm:hidden"
      data-testid="bottom-nav"
    >
      <div className="flex items-center justify-around h-16 px-2" data-testid="bottom-nav-container">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full py-2 px-1 transition-colors",
                active 
                  ? "text-[#4AB831]" 
                  : "text-slate-500 hover:text-slate-700"
              )}
              data-testid={`bottom-nav-${item.href.split('/').pop() || 'dashboard'}`}
            >
              <Icon className={cn("h-5 w-5", active && "stroke-[2.5px]")} />
              <span className="text-[10px] mt-1 font-medium truncate max-w-full">
                {item.name}
              </span>
            </Link>
          );
        })}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full py-2 px-1 transition-colors",
                isMoreActive 
                  ? "text-[#4AB831]" 
                  : "text-slate-500 hover:text-slate-700"
              )}
              data-testid="bottom-nav-more"
            >
              <MoreHorizontal className={cn("h-5 w-5", isMoreActive && "stroke-[2.5px]")} />
              <span className="text-[10px] mt-1 font-medium">{t('items.more', 'More')}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            side="top" 
            sideOffset={8}
            className="w-48 mb-2 bg-white z-[60]"
            data-testid="bottom-nav-more-menu"
          >
            {moreNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 cursor-pointer",
                      active && "text-[#4AB831] font-medium"
                    )}
                    data-testid={`bottom-nav-more-${item.href.split('/').pop()}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default BottomNav;
