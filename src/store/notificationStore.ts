import { create } from "zustand";

export type NotificationType = "critical" | "info" | "warning" | "success";

export interface AppNotification {
  readonly id: string;
  readonly type: NotificationType;
  readonly title: string;
  readonly body: string;
  readonly patientId?: string;
  readonly read: boolean;
  readonly timestamp: string;
}

interface NotificationState {
  readonly notifications: readonly AppNotification[];
  readonly unreadCount: number;
  addNotification: (
    notification: Omit<AppNotification, "id" | "timestamp" | "read">,
  ) => void;
  markAllRead: () => void;
  dismiss: (id: string) => void;
}

function countUnread(items: readonly AppNotification[]): number {
  return items.filter((item) => !item.read).length;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) =>
    set((state) => {
      const nextItems = [
        {
          ...notification,
          id: crypto.randomUUID(),
          read: false,
          timestamp: new Date().toISOString(),
        },
        ...state.notifications,
      ].slice(0, 50);

      return {
        notifications: nextItems,
        unreadCount: countUnread(nextItems),
      };
    }),
  markAllRead: () =>
    set((state) => {
      const nextItems = state.notifications.map((item) => ({
        ...item,
        read: true,
      }));
      return {
        notifications: nextItems,
        unreadCount: 0,
      };
    }),
  dismiss: (id) =>
    set((state) => {
      const nextItems = state.notifications.filter((item) => item.id !== id);
      return {
        notifications: nextItems,
        unreadCount: countUnread(nextItems),
      };
    }),
}));
