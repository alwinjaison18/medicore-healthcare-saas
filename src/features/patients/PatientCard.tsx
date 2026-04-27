import { HeartPulse, ThermometerSun, Waves } from "lucide-react";
import { memo } from "react";

import type { Patient, PatientStatus } from "../../types/patient.types";

export interface PatientCardProps {
  readonly patient: Patient;
  readonly onViewDetails: (patient: Patient) => void;
}

function statusClass(status: PatientStatus): string {
  if (status === "stable") return "bg-success/15 text-success";
  if (status === "critical") return "bg-danger/15 text-danger";
  if (status === "pending") return "bg-warning/20 text-warning";
  return "bg-slate-200 text-slate-600";
}

function initials(patient: Patient): string {
  return `${patient.firstName[0] ?? ""}${patient.lastName[0] ?? ""}`.toUpperCase();
}

function PatientCardComponent({
  patient,
  onViewDetails,
}: Readonly<PatientCardProps>) {
  return (
    <article className="group rounded-2xl bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-hover">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {initials(patient)}
          </div>
          <div>
            <h3 className="font-medium text-text">
              {patient.firstName} {patient.lastName}
            </h3>
            <p className="text-xs text-slate-500">{patient.id}</p>
          </div>
        </div>
        <span
          className={[
            "rounded-full px-2 py-1 text-xs font-semibold uppercase",
            statusClass(patient.status),
          ].join(" ")}
        >
          {patient.status}
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-700">{patient.diagnosis}</p>
      <p className="mt-1 text-xs text-slate-500">
        {patient.ward} • {patient.bed}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-600">
        <span className="inline-flex items-center gap-1">
          <HeartPulse size={12} /> {patient.vitals.heartRate}
        </span>
        <span className="inline-flex items-center gap-1">
          <ThermometerSun size={12} /> {patient.vitals.temperature}°C
        </span>
        <span className="inline-flex items-center gap-1">
          <Waves size={12} /> {patient.vitals.oxygenSat}%
        </span>
      </div>

      <button
        type="button"
        onClick={() => onViewDetails(patient)}
        className="mt-4 w-full rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100"
      >
        View Details
      </button>
    </article>
  );
}

export const PatientCard = memo(PatientCardComponent);
