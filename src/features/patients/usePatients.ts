import { useEffect, useMemo, useState } from "react";

import { fetchMockPatients } from "../../services/mockData";
import { usePatientStore } from "../../store/patientStore";
import type { Patient } from "../../types/patient.types";

interface UsePatientsResult {
  readonly patients: readonly Patient[];
  readonly filteredPatients: readonly Patient[];
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly wards: readonly string[];
}

export function usePatients(): UsePatientsResult {
  const patients = usePatientStore((state) => state.patients);
  const filters = usePatientStore((state) => state.filters);
  const setPatients = usePatientStore((state) => state.setPatients);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (patients.length > 0) {
      return;
    }

    let active = true;
    setIsLoading(true);

    fetchMockPatients()
      .then((items) => {
        if (!active) {
          return;
        }

        setPatients(items);
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setError("Unable to load patient records right now.");
      })
      .finally(() => {
        if (!active) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [patients.length, setPatients]);

  const wards = useMemo(
    () =>
      Array.from(new Set(patients.map((patient) => patient.ward))).sort(
        (a, b) => a.localeCompare(b),
      ),
    [patients],
  );

  const filteredPatients = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${patient.firstName} ${patient.lastName}`
          .toLowerCase()
          .includes(normalizedSearch) ||
        patient.id.toLowerCase().includes(normalizedSearch) ||
        patient.diagnosis.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(patient.status);

      const matchesWard =
        filters.ward === "all" ||
        filters.ward === "" ||
        patient.ward === filters.ward;

      return matchesSearch && matchesStatus && matchesWard;
    });
  }, [filters.search, filters.status, filters.ward, patients]);

  return {
    patients,
    filteredPatients,
    isLoading,
    error,
    wards,
  };
}
