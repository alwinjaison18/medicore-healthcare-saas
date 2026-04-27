import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";
import { usePatientStore } from "../../store/patientStore";
import type { PatientStatus } from "../../types/patient.types";

export interface PatientFiltersProps {
  readonly wards: readonly string[];
}

const statuses: readonly PatientStatus[] = [
  "critical",
  "stable",
  "pending",
  "discharged",
];

export function PatientFilters({ wards }: Readonly<PatientFiltersProps>) {
  const filters = usePatientStore((state) => state.filters);
  const updateFilter = usePatientStore((state) => state.updateFilter);
  const clearFilters = usePatientStore((state) => state.clearFilters);
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    updateFilter({ search: debouncedSearch });
  }, [debouncedSearch, updateFilter]);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const wardOptions = useMemo(() => ["all", ...wards], [wards]);

  return (
    <section className="rounded-2xl bg-white p-4 shadow-card">
      <div className="grid gap-3 lg:grid-cols-4">
        <label className="relative lg:col-span-2">
          <Search
            className="pointer-events-none absolute left-3 top-2.5 text-slate-400"
            size={16}
          />
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search by name, ID, diagnosis"
            className="w-full rounded-lg bg-slate-50 py-2 pl-9 pr-3 text-sm text-text outline-none ring-accent focus:ring-2"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => {
            const active = filters.status.includes(status);
            return (
              <button
                key={status}
                type="button"
                onClick={() => {
                  const next = active
                    ? filters.status.filter((item) => item !== status)
                    : [...filters.status, status];
                  updateFilter({ status: next });
                }}
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase transition",
                  active
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600",
                ].join(" ")}
              >
                {status}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filters.ward}
            onChange={(event) => updateFilter({ ward: event.target.value })}
            className="w-full rounded-lg bg-slate-50 px-3 py-2 text-sm text-text outline-none ring-accent focus:ring-2"
          >
            {wardOptions.map((ward) => (
              <option key={ward} value={ward}>
                {ward === "all" ? "All wards" : ward}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg px-3 py-2 text-xs font-semibold text-accent hover:bg-slate-100"
          >
            Clear all
          </button>
        </div>
      </div>
    </section>
  );
}
