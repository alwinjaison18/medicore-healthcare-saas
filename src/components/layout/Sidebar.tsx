import { Activity, LayoutDashboard, LogOut, UsersRound } from "lucide-react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../features/auth/useAuth";
import { useAuthStore } from "../../store/authStore";

interface NavigationItem {
  readonly to: string;
  readonly label: string;
  readonly icon: typeof LayoutDashboard;
}

export interface SidebarProps {
  readonly mobile?: boolean;
}

const NAV_ITEMS: readonly NavigationItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/analytics", label: "Analytics", icon: Activity },
  { to: "/patients", label: "Patients", icon: UsersRound },
];

export function Sidebar({ mobile = false }: SidebarProps) {
  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <aside
      className={[
        "w-64 bg-primary px-4 py-6 text-slate-100",
        mobile
          ? "flex h-full flex-col"
          : "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:h-screen lg:flex-col lg:overflow-y-auto",
      ].join(" ")}
    >
      <h1 className="px-3 font-display text-2xl text-white">MediCore</h1>
      <p className="px-3 pt-1 text-xs uppercase tracking-[0.16em] text-slate-300">
        Clinical Intelligence. Simplified.
      </p>

      <nav className="mt-8 flex flex-col gap-2" aria-label="Primary">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-accent text-white"
                    : "text-slate-200 hover:bg-primary-light hover:text-white",
                ].join(" ")
              }
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-600/60 px-3 pt-4">
        <p className="text-xs uppercase tracking-[0.12em] text-slate-300">
          Signed in as
        </p>
        <p className="mt-1 truncate text-sm font-medium text-white">
          {user?.displayName ?? user?.email ?? "Clinical Admin"}
        </p>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={isLoading}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300/20 bg-slate-100/10 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-100/20 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Sign out"
        >
          <LogOut size={16} />
          {isLoading ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
