"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  {
    label: "Dashboard",
    icon: "dashboard",
    href: "/admin/dashboard",
  },
  {
    label: "Projects",
    icon: "work",
    href: "/admin/projects",
  },
  {
    label: "Certificates",
    icon: "workspace_premium",
    href: "/admin/certificates",
  },
  {
    label: "Experience",
    icon: "business_center",
    href: "/admin/experience",
  },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* Top Navigation */}
      <nav className="glass-card border-b border-border-hairline sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">
                admin_panel_settings
              </span>
              <span className="font-headline-sm text-base sm:text-xl text-text-primary">
                Admin Portal
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2 text-text-secondary text-sm">
                <span className="material-symbols-outlined text-lg">
                  account_circle
                </span>
                <span className="truncate max-w-[150px]">{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-surface-container hover:bg-surface-container-highest border border-border-hairline rounded-lg text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-base sm:text-lg">
                  logout
                </span>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-4rem)] glass-card border-r border-border-hairline hidden lg:block">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:bg-surface-container hover:text-text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-border-hairline z-50 safe-area-inset-bottom">
          <nav className="grid grid-cols-4 p-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-text-muted hover:text-text-primary hover:bg-surface-container"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
