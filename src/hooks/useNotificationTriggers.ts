import { useEffect, useRef } from "react";

import {
  createOverdueReviewMessage,
  findCriticalVitalsPatients,
  showLocalNotification,
} from "../services/notificationService";
import { useNotificationStore } from "../store/notificationStore";
import { usePatientStore } from "../store/patientStore";

export function useNotificationTriggers() {
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  const patients = usePatientStore((state) => state.patients);

  const criticalAlertSentRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (patients.length === 0) {
      return;
    }

    const criticalPatients = findCriticalVitalsPatients(patients);

    criticalPatients.forEach((patient) => {
      if (criticalAlertSentRef.current.has(patient.id)) {
        return;
      }

      criticalAlertSentRef.current.add(patient.id);
      const message = `${patient.id} O2 saturation dropped to ${patient.vitals.oxygenSat}% - ${patient.ward}/${patient.bed}`;

      addNotification({
        type: "critical",
        title: "Critical Vitals Alert",
        body: message,
        patientId: patient.id,
      });

      showLocalNotification("Critical Vitals Alert", message);
    });
  }, [addNotification, patients]);

  useEffect(() => {
    const overdueTimer = window.setInterval(() => {
      const count = Math.max(1, Math.floor(Math.random() * 4));
      const message = createOverdueReviewMessage(count);

      addNotification({
        type: "warning",
        title: "Overdue Review",
        body: message,
      });

      showLocalNotification("Overdue Review", message);
    }, 90_000);

    return () => {
      window.clearInterval(overdueTimer);
    };
  }, [addNotification]);

  useEffect(() => {
    const onOffline = () => {
      addNotification({
        type: "warning",
        title: "Offline Mode",
        body: "Network unavailable. MediCore is running with cached data.",
      });
    };

    const onOnline = () => {
      addNotification({
        type: "success",
        title: "Connection Restored",
        body: "You are back online and data sync has resumed.",
      });
    };

    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, [addNotification]);
}
