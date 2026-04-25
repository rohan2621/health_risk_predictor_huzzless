import { Home, Stethoscope, BarChart3, Leaf, Info, LogOut, HeartPulse } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { icon: Home, label: "Dashboard", to: "/" },
  { icon: Stethoscope, label: "Pneumonia Detection", to: "/pneumonia" },
  { icon: HeartPulse, label: "Heart Disease", to: "/heart-disease" },
  { icon: BarChart3, label: "Health Insights", to: "/insights" },
  { icon: Leaf, label: "Lifestyle Tips", to: "/lifestyle" },
  { icon: Info, label: "About", to: "/about" },
];

export const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex group/sidebar shrink-0 flex-col border-r border-sidebar-border bg-sidebar h-screen sticky top-0 z-40",
        "w-[72px] hover:w-64 transition-[width] duration-300 ease-in-out overflow-hidden"
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-6 h-[80px] shrink-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand shadow-soft">
          <HeartPulse className="h-5 w-5 text-primary-foreground" />
        </div>
        <span
          className={cn(
            "font-bold text-lg text-sidebar-foreground whitespace-nowrap",
            "opacity-0 -translate-x-2 transition-all duration-200",
            "group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 group-hover/sidebar:delay-150"
          )}
        >
          HealthGuard AI
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span
              className={cn(
                "whitespace-nowrap opacity-0 -translate-x-2 transition-all duration-200",
                "group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 group-hover/sidebar:delay-150"
              )}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span
            className={cn(
              "whitespace-nowrap opacity-0 -translate-x-2 transition-all duration-200",
              "group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 group-hover/sidebar:delay-150"
            )}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};
