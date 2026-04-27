import { useEffect, useMemo, useState } from "react";

import { useNotificationStore } from "../../store/notificationStore";

export function NotificationToast() {
  const notifications = useNotificationStore((state) => state.notifications);
  const [visibleId, setVisibleId] = useState<string | null>(null);

  const latest = useMemo(() => notifications[0] ?? null, [notifications]);

  useEffect(() => {
    if (!latest) {
      setVisibleId(null);
      return;
    }

    setVisibleId(latest.id);
    const timeoutId = window.setTimeout(() => {
      setVisibleId(null);
    }, 4500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [latest]);

  if (!latest || visibleId !== latest.id) {
    return null;
  }

  const accentClass =
    latest.type === "critical"
      ? "border-danger"
      : latest.type === "warning"
        ? "border-warning"
        : latest.type === "success"
          ? "border-success"
          : "border-accent";

  return (
    <aside
      className={[
        "fixed bottom-4 right-4 z-[70] w-full max-w-sm rounded-xl border-l-4 bg-white p-4 shadow-hover",
        accentClass,
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <p className="text-sm font-semibold text-text">{latest.title}</p>
      <p className="mt-1 text-xs text-slate-600">{latest.body}</p>
    </aside>
  );
}
