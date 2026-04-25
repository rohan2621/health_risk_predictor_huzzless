import { useState, useRef, useEffect } from "react";
import { Bell, Send, Trash2, X, ShieldCheck } from "lucide-react";
import { useNotifications, ADMIN_EMAIL } from "@/contexts/NotificationsContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const formatTime = (ts: number) => {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

export const NotificationsBell = () => {
  const {
    notifications,
    unreadCount,
    isAdmin,
    sendNotification,
    markAllRead,
    clearAll,
    removeNotification,
  } = useNotifications();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const togglePanel = () => {
    const next = !open;
    setOpen(next);
    if (next && unreadCount > 0) {
      // mark read shortly after opening so badge count is visible briefly
      setTimeout(() => markAllRead(), 400);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error("Please fill in both title and message");
      return;
    }
    sendNotification(title, message);
    toast.success("Notification sent");
    setTitle("");
    setMessage("");
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={togglePanel}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-foreground" />
        <span
          className={cn(
            "absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold",
            unreadCount > 0
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[360px] max-w-[90vw] rounded-xl border border-border bg-popover shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              {isAdmin && (
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="h-3 w-3" /> Admin channel
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-muted"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-md hover:bg-muted"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {isAdmin && (
            <form onSubmit={handleSend} className="px-4 py-3 border-b border-border bg-muted/30 space-y-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                maxLength={80}
                className="w-full text-sm px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message…"
                rows={2}
                maxLength={300}
                className="w-full text-sm px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <Send className="h-3.5 w-3.5" /> Send
                </button>
              </div>
            </form>
          )}

          <div className="max-h-[320px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No notifications yet
                {!isAdmin && (
                  <p className="text-xs mt-1">
                    Only {ADMIN_EMAIL} can send notifications.
                  </p>
                )}
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={cn(
                      "group px-4 py-3 hover:bg-muted/50 transition-colors",
                      !n.read && "bg-primary/5",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 break-words">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{formatTime(n.createdAt)}</p>
                      </div>
                      <button
                        onClick={() => removeNotification(n.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-muted transition-opacity"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
