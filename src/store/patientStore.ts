import { create } from "zustand";

import type { Patient, PatientStatus } from "../types/patient.types";

export type PatientViewMode = "grid" | "list";

export interface PatientFilters {
  readonly search: string;
  readonly status: readonly PatientStatus[];
  readonly ward: string;
}

interface PatientState {
  readonly patients: readonly Patient[];
  readonly selected: Patient | null;
  readonly viewMode: PatientViewMode;
  readonly filters: PatientFilters;
  setPatients: (patients: readonly Patient[]) => void;
  addPatient: (patient: Patient) => void;
  setSelected: (patient: Patient | null) => void;
  setViewMode: (mode: PatientViewMode) => void;
  updateFilter: (partial: Partial<PatientFilters>) => void;
  clearFilters: () => void;
}

const defaultFilters: PatientFilters = {
  search: "",
  status: [],
  ward: "all",
};

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  selected: null,
  viewMode: "grid",
  filters: defaultFilters,
  setPatients: (patients) => set({ patients }),
  addPatient: (patient) =>
    set((state) => ({
      patients: [patient, ...state.patients],
    })),
  setSelected: (patient) => set({ selected: patient }),
  setViewMode: (mode) => set({ viewMode: mode }),
  updateFilter: (partial) =>
    set((state) => ({ filters: { ...state.filters, ...partial } })),
  clearFilters: () => set({ filters: defaultFilters }),
}));
