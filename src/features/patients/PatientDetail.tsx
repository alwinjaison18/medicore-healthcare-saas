import { useParams } from "react-router-dom";
import { Bell, Flag, Printer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

import { fetchMockPatients } from "../../services/mockData";
import { usePatientStore } from "../../store/patientStore";
import type { Patient, PatientStatus } from "../../types/patient.types";

type PatientTab = "overview" | "vitals" | "notes" | "timeline";

function statusClass(status: PatientStatus): string {
  if (status === "stable") return "bg-success/15 text-success";
  if (status === "critical") return "bg-danger/15 text-danger";
  if (status === "pending") return "bg-warning/20 text-warning";
  return "bg-slate-200 text-slate-600";
}

function initials(patient: Patient): string {
  return `${patient.firstName[0] ?? ""}${patient.lastName[0] ?? ""}`.toUpperCase();
}

function MiniSparkline({
  data,
  color,
}: Readonly<{ data: readonly number[]; color: string }>) {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <div className="h-16 w-full">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PatientDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<PatientTab>("overview");
  const patients = usePatientStore((state) => state.patients);
  const selected = usePatientStore((state) => state.selected);
  const setPatients = usePatientStore((state) => state.setPatients);
  const setSelected = usePatientStore((state) => state.setSelected);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (patients.length > 0) {
      return;
    }

    let active = true;
    setIsLoading(true);
    fetchMockPatients()
      .then((items) => {
        if (!active) return;
        setPatients(items);
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [patients.length, setPatients]);

  const patient = useMemo(() => {
    if (selected && selected.id === id) {
      return selected;
    }

    const found = patients.find((item) => item.id === id) ?? null;
    if (found) {
      setSelected(found);
    }
    return found;
  }, [id, patients, selected, setSelected]);

  const tabButtonClass = (tab: PatientTab) =>
    [
      "rounded-lg px-3 py-2 text-sm font-medium transition",
      activeTab === tab
        ? "bg-primary text-white"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200",
    ].join(" ");

  if (isLoading || !patient) {
    return (
      <section className="rounded-2xl bg-white p-6 shadow-card">
        <div className="h-44 animate-pulse rounded-xl bg-slate-200/70" />
      </section>
    );
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {initials(patient)}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-danger">
                Patient Detail
              </p>
              <h1 className="mt-1 font-display text-4xl text-primary">
                {patient.firstName} {patient.lastName}
              </h1>
              <p className="text-sm text-slate-500">{patient.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={[
                "rounded-full px-2 py-1 text-xs font-semibold uppercase",
                statusClass(patient.status),
              ].join(" ")}
            >
              {patient.status}
            </span>
            <button
              type="button"
              className="rounded-lg bg-slate-100 p-2 text-slate-700"
            >
              <Printer size={16} />
            </button>
            <button
              type="button"
              className="rounded-lg bg-slate-100 p-2 text-slate-700"
            >
              <Flag size={16} />
            </button>
            <button
              type="button"
              className="rounded-lg bg-slate-100 p-2 text-slate-700"
            >
              <Bell size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap gap-2 rounded-2xl bg-white p-4 shadow-card">
        <button
          type="button"
          className={tabButtonClass("overview")}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          type="button"
          className={tabButtonClass("vitals")}
          onClick={() => setActiveTab("vitals")}
        >
          Vitals History
        </button>
        <button
          type="button"
          className={tabButtonClass("notes")}
          onClick={() => setActiveTab("notes")}
        >
          Notes
        </button>
        <button
          type="button"
          className={tabButtonClass("timeline")}
          onClick={() => setActiveTab("timeline")}
        >
          Timeline
        </button>
      </section>

      {activeTab === "overview" ? (
        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl bg-white p-5 shadow-card">
            <h2 className="font-display text-2xl text-primary">Demographics</h2>
            <dl className="mt-3 grid gap-2 text-sm text-slate-700">
              <div className="flex justify-between">
                <dt>Age</dt>
                <dd>{patient.age}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Gender</dt>
                <dd>{patient.gender}</dd>
              </div>
              <div className="flex justify-between">
                <dt>DOB</dt>
                <dd>{patient.dob}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Blood Type</dt>
                <dd>{patient.bloodType}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-2xl bg-white p-5 shadow-card">
            <h2 className="font-display text-2xl text-primary">
              Clinical Summary
            </h2>
            <p className="mt-3 text-sm text-slate-700">{patient.diagnosis}</p>
            <p className="mt-2 text-sm text-slate-600">
              {patient.ward} • {patient.bed}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Attending: {patient.doctor}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Allergies: {patient.allergies.join(", ")}
            </p>
          </article>
        </section>
      ) : null}

      {activeTab === "vitals" ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm text-slate-600">Heart Rate</p>
            <MiniSparkline
              data={[76, 82, 79, 84, patient.vitals.heartRate]}
              color="#0096C7"
            />
            <p className="text-sm font-semibold text-text">
              {patient.vitals.heartRate} bpm
            </p>
          </article>
          <article className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm text-slate-600">Temperature</p>
            <MiniSparkline
              data={[36.8, 36.9, 37.1, 36.7, patient.vitals.temperature]}
              color="#FFB703"
            />
            <p className="text-sm font-semibold text-text">
              {patient.vitals.temperature}°C
            </p>
          </article>
          <article className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm text-slate-600">Oxygen</p>
            <MiniSparkline
              data={[95, 97, 96, 98, patient.vitals.oxygenSat]}
              color="#06D6A0"
            />
            <p className="text-sm font-semibold text-text">
              {patient.vitals.oxygenSat}%
            </p>
          </article>
          <article className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm text-slate-600">Blood Pressure</p>
            <MiniSparkline
              data={[
                118,
                122,
                126,
                124,
                Number(patient.vitals.bloodPressure.split("/")[0]),
              ]}
              color="#7C3AED"
            />
            <p className="text-sm font-semibold text-text">
              {patient.vitals.bloodPressure}
            </p>
          </article>
        </section>
      ) : null}

      {activeTab === "notes" ? (
        <section className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="font-display text-2xl text-primary">Notes</h2>
          <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            {patient.notes}
          </p>
        </section>
      ) : null}

      {activeTab === "timeline" ? (
        <section className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="font-display text-2xl text-primary">Timeline</h2>
          <ol className="mt-4 space-y-4">
            {patient.timeline.map((event) => (
              <li key={event.id} className="relative pl-6">
                <span className="absolute left-0 top-1 h-3 w-3 rounded-full bg-accent" />
                <p className="text-sm font-medium text-text">{event.title}</p>
                <p className="text-xs text-slate-500">{event.timestamp}</p>
                <p className="mt-1 text-sm text-slate-700">
                  {event.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}
