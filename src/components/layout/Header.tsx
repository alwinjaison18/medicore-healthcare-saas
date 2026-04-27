import { Bell, CircleUserRound, Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  getNotificationPermissionState,
  requestNotificationPermission,
} from "../../services/notificationService";
import { useNotificationStore } from "../../store/notificationStore";

export interface HeaderProps {
  readonly onOpenMobileNav?: () => void;
}

export function Header({ onOpenMobileNav }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const notificationPanelRef = useRef<HTMLDivElement | null>(null);
  const notifications = useNotificationStore((state) => state.notifications);
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const markAllRead = useNotificationStore((state) => state.markAllRead);
  const dismiss = useNotificationStore((state) => state.dismiss);
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  const permission = useMemo(() => getNotificationPermissionState(), [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onDocumentClick = (event: MouseEvent) => {
      if (!notificationPanelRef.current) {
        return;
      }

      if (!notificationPanelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocumentClick);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isOpen]);

  const handleEnableNotifications = async () => {
    const result = await requestNotificationPermission();

    addNotification({
      type:
        result === "granted"
          ? "success"
          : result === "denied"
            ? "warning"
            : "info",
      title: "Notifications",
      body:
        result === "granted"
          ? "Notification permission enabled."
          : result === "denied"
            ? "Notification permission denied in browser settings."
            : "Notification permission request dismissed.",
    });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white/95 px-4 shadow-card backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          aria-label="Open navigation"
          onClick={onOpenMobileNav}
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            MediCore
          </p>
          <h2 className="font-display text-2xl leading-none text-primary">
            Operations Console
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative" ref={notificationPanelRef}>
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Open notifications"
            onClick={() => setIsOpen((current) => !current)}
          >
            <Bell size={18} />
            {unreadCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            ) : null}
          </button>

          {isOpen ? (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-xl bg-white p-3 shadow-hover">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-text">Notifications</h3>
                <button
                  type="button"
                  onClick={markAllRead}
                  className="text-xs font-semibold text-accent"
                  aria-label="Mark all notifications as read"
                >
                  Mark all read
                </button>
              </div>

              {permission !== "granted" ? (
                <button
                  type="button"
                  onClick={handleEnableNotifications}
                  className="mt-2 w-full rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white"
                  aria-label="Enable browser notifications"
                >
                  Enable notifications
                </button>
              ) : null}

              <div className="mt-3 max-h-72 space-y-2 overflow-auto">
                {notifications.length === 0 ? (
                  <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                    No notifications yet.
                  </p>
                ) : (
                  notifications.map((item) => (
                    <article
                      key={item.id}
                      className={[
                        "rounded-lg p-3 text-xs",
                        item.read ? "bg-slate-50" : "bg-accent/10",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-text">
                            {item.title}
                          </p>
                          <p className="mt-1 text-slate-600">{item.body}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => dismiss(item.id)}
                          className="rounded p-1 text-slate-400 hover:bg-slate-200"
                          aria-label="Dismiss notification"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium text-primary hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Account menu"
        >
          <CircleUserRound size={20} />
          <span className="hidden sm:inline">Admin</span>
        </button>
      </div>
    </header>
  );
}
