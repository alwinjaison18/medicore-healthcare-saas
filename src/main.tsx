import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import App from "./App";
import "./index.css";
import { useNotificationStore } from "./store/notificationStore";

registerSW({
  onNeedRefresh() {
    useNotificationStore.getState().addNotification({
      type: "info",
      title: "Update Available",
      body: "A new version of MediCore is ready. Refresh to update.",
    });
  },
  onOfflineReady() {
    useNotificationStore.getState().addNotification({
      type: "success",
      title: "Offline Ready",
      body: "MediCore is ready to run with cached assets offline.",
    });
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
