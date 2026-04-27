import { useState } from "react";
import { Outlet } from "react-router-dom";

import { useNotificationTriggers } from "../../hooks/useNotificationTriggers";
import { NotificationToast } from "../common/NotificationToast";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  useNotificationTriggers();

  return (
    <div className="min-h-screen bg-surface text-text">
      <NotificationToast />
      <Sidebar />

      {isMobileNavOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/35 lg:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        >
          <div
            className="h-full w-64"
            onClick={(event) => event.stopPropagation()}
          >
            <Sidebar mobile />
          </div>
        </div>
      ) : null}

      <div className="flex min-h-screen flex-col lg:pl-64">
        <Header onOpenMobileNav={() => setIsMobileNavOpen(true)} />
        <main className="page-enter flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
