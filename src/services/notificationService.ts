import type { Patient } from "../types/patient.types";

export type NotificationPermissionState = "granted" | "denied" | "default";

export function getNotificationPermissionState(): NotificationPermissionState {
  if (!("Notification" in window)) {
    return "denied";
  }

  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
  if (!("Notification" in window)) {
    return "denied";
  }

  return Notification.requestPermission();
}

export function showLocalNotification(title: string, body: string): void {
  if (!("Notification" in window)) {
    return;
  }

  if (Notification.permission !== "granted") {
    return;
  }

  new Notification(title, {
    body,
    icon: "/icons/icon-192.svg",
    badge: "/icons/icon-192.svg",
  });
}

export function findCriticalVitalsPatients(
  patients: readonly Patient[],
): readonly Patient[] {
  return patients.filter((patient) => patient.vitals.oxygenSat < 90);
}

export function createOverdueReviewMessage(count: number): string {
  return `${count} patients pending review for more than 4 hours.`;
}
