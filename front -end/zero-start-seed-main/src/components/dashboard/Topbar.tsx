import { Menu, ChevronDown, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationsBell } from "./NotificationsBell";

export const Topbar = () => {
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  return (
    <header className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <button className="p-2 rounded-lg hover:bg-muted transition-colors lg:hidden" aria-label="Toggle menu">
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      <div className="flex items-center gap-4 ml-auto">
        <NotificationsBell />

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft">
            <UserIcon className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground hidden sm:inline">Hello, {displayName}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};
