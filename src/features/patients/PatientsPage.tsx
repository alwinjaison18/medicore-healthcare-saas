import { useNavigate } from "react-router-dom";

import { ViewToggle } from "../../components/common/ViewToggle";
import { showLocalNotification } from "../../services/notificationService";
import { useNotificationStore } from "../../store/notificationStore";
import { usePatientStore } from "../../store/patientStore";
import type { Patient } from "../../types/patient.types";
import { PatientCard } from "./PatientCard";
import { PatientFilters } from "./PatientFilters";
import { PatientRow } from "./PatientRow";
import { usePatients } from "./usePatients";

function PatientsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-56 animate-pulse rounded-2xl bg-slate-200/70"
        />
      ))}
    </div>
  );
}

export function PatientsPage() {
  const navigate = useNavigate();
  const viewMode = usePatientStore((state) => state.viewMode);
  const setViewMode = usePatientStore((state) => state.setViewMode);
  const setSelected = usePatientStore((state) => state.setSelected);
  const addPatient = usePatientStore((state) => state.addPatient);
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  const { patients, filteredPatients, isLoading, error, wards } = usePatients();

  const onViewDetails = (patient: Patient) => {
    setSelected(patient);
    navigate(`/patients/${patient.id}`);
  };

  const simulateAdmission = () => {
    const idNumber = patients.length + 1;
    const newPatient: Patient = {
      id: `PAT-${String(idNumber).padStart(4, "0")}`,
      firstName: "John",
      lastName: "Smith",
      dob: "1986-05-14",
      age: 40,
      gender: "M",
      bloodType: "O+",
      ward: "General A",
      bed: `GE-${(idNumber % 20) + 1}`,
      admittedOn: new Date().toISOString().slice(0, 10),
      diagnosis: "Observation",
      status: "pending",
      doctor: "Dr. Patel",
      vitals: {
        heartRate: 82,
        bloodPressure: "120/80",
        temperature: 36.9,
        oxygenSat: 96,
        recordedAt: new Date().toISOString(),
      },
      allergies: ["None"],
      notes: "New patient admitted for initial evaluation.",
      timeline: [
        {
          id: `${idNumber}-timeline-1`,
          timestamp: "just now",
          title: "Admission",
          description: "Patient admitted and pending first review.",
        },
      ],
    };

    addPatient(newPatient);
    const message = `${newPatient.firstName} ${newPatient.lastName} admitted to ${newPatient.ward}. Doctor: ${newPatient.doctor}`;

    addNotification({
      type: "info",
      title: "New Patient Admitted",
      body: message,
      patientId: newPatient.id,
    });
    showLocalNotification("New Patient Admitted", message);
  };

  const hasEmpty = !isLoading && !error && filteredPatients.length === 0;

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-5 shadow-card">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-success">
            Patients
          </p>
          <h1 className="mt-1 font-display text-4xl text-primary">
            Patient Operations
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Showing {filteredPatients.length} of {patients.length} records
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={simulateAdmission}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white"
            aria-label="Simulate new patient admission"
          >
            Simulate Admission
          </button>
          <ViewToggle mode={viewMode} onChange={setViewMode} />
        </div>
      </header>

      <PatientFilters wards={wards} />

      {error ? (
        <section className="rounded-2xl bg-danger/10 p-5 shadow-card">
          <p className="text-sm text-danger">{error}</p>
        </section>
      ) : null}

      {isLoading ? <PatientsSkeleton /> : null}

      {hasEmpty ? (
        <section className="rounded-2xl bg-white p-6 text-center shadow-card">
          <h2 className="font-display text-3xl text-primary">
            No matching patients
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Adjust search or filters to view patient records.
          </p>
        </section>
      ) : null}

      {!isLoading && !hasEmpty ? (
        viewMode === "grid" ? (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onViewDetails={onViewDetails}
              />
            ))}
          </section>
        ) : (
          <PatientRow
            patients={filteredPatients}
            onViewDetails={onViewDetails}
          />
        )
      ) : null}
    </div>
  );
}
