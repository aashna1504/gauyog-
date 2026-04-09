"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Package,
  Mail,
  ShoppingCart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard",  icon: LayoutDashboard, roles: ["ADMIN", "SALES"] },
  { label: "Users",     href: "/users",       icon: Users,           roles: ["ADMIN"] },
  { label: "Products",  href: "/products",    icon: Package,         roles: ["ADMIN", "SALES"] },
  { label: "Orders",    href: "/orders",      icon: ShoppingCart,    roles: ["ADMIN", "SALES"] },
  { label: "Contacts",  href: "/contacts",    icon: Mail,            roles: ["ADMIN", "SALES"] },
  { label: "Settings",  href: "/settings",    icon: Settings,        roles: ["ADMIN"] },
];

function SidebarContent({
  collapsed,
  onClose,
  role,
}: {
  collapsed: boolean;
  onClose?: () => void;
  role: string;
}) {
  const pathname = usePathname();
  const { toggleSidebar } = useUIStore();

  const visibleItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div
        className={cn(
          "flex items-center border-b border-sidebar-border px-4 py-4",
          collapsed ? "justify-center px-0" : "gap-3",
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Leaf className="h-4 w-4" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold leading-none text-sidebar-primary-foreground">
              Gauyog
            </p>
            <p className="text-xs text-sidebar-foreground/60 mt-0.5">
              {role === "ADMIN" ? "Admin Panel" : "Sales Portal"}
            </p>
          </div>
        )}
        {/* Mobile close button */}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 text-sidebar-foreground hover:bg-sidebar-accent ml-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {visibleItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center px-0",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-sidebar-border" />

      {/* Collapse toggle — desktop only */}
      <div className={cn("p-2", collapsed && "flex justify-center")}>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={cn(
            "w-full gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            collapsed && "w-9 px-0 justify-center",
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { sidebarCollapsed, mobileSidebarOpen, closeMobileSidebar } = useUIStore();
  const { data: session } = useSession();
  const role = session?.user?.role ?? "SALES";

  return (
    <>
      {/* ── Mobile overlay backdrop ── */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* ── Mobile drawer (slides in from left) ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:hidden",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent collapsed={false} onClose={closeMobileSidebar} role={role} />
      </aside>

      {/* ── Desktop sidebar (static, collapsible) ── */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r transition-all duration-300 ease-in-out shrink-0",
          sidebarCollapsed ? "w-16" : "w-60",
        )}
      >
        <SidebarContent collapsed={sidebarCollapsed} role={role} />
      </aside>
    </>
  );
}
