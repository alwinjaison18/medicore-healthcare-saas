import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMemo, useRef, useState } from "react";

import type { Patient, PatientStatus } from "../../types/patient.types";

export interface PatientRowProps {
  readonly patients: readonly Patient[];
  readonly onViewDetails: (patient: Patient) => void;
}

function statusClass(status: PatientStatus): string {
  if (status === "stable") return "bg-success/15 text-success";
  if (status === "critical") return "bg-danger/15 text-danger";
  if (status === "pending") return "bg-warning/20 text-warning";
  return "bg-slate-200 text-slate-600";
}

const columnHelper = createColumnHelper<Patient>();

export function PatientRow({
  patients,
  onViewDetails,
}: Readonly<PatientRowProps>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => (
          <span className="font-mono text-xs">{info.getValue()}</span>
        ),
      }),
      columnHelper.display({
        id: "patient",
        header: "Patient",
        cell: (info) => {
          const patient = info.row.original;
          return (
            <div>
              <p className="font-medium text-text">
                {patient.firstName} {patient.lastName}
              </p>
              <p className="text-xs text-slate-500">
                {patient.gender}, {patient.age}
              </p>
            </div>
          );
        },
      }),
      columnHelper.display({
        id: "wardBed",
        header: "Ward/Bed",
        cell: (info) => {
          const patient = info.row.original;
          return (
            <span>
              {patient.ward} / {patient.bed}
            </span>
          );
        },
      }),
      columnHelper.accessor("diagnosis", { header: "Diagnosis" }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <span
            className={[
              "rounded-full px-2 py-1 text-xs font-semibold uppercase",
              statusClass(info.getValue()),
            ].join(" ")}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("admittedOn", { header: "Admitted" }),
      columnHelper.display({
        id: "lastVitals",
        header: "Last Vitals",
        cell: (info) => {
          const v = info.row.original.vitals;
          return (
            <span className="text-xs text-slate-600">
              HR {v.heartRate} • O2 {v.oxygenSat}% • BP {v.bloodPressure}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <button
            type="button"
            onClick={() => onViewDetails(info.row.original)}
            className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-white"
          >
            View
          </button>
        ),
      }),
    ],
    [onViewDetails],
  );

  const table = useReactTable({
    data: patients as Patient[],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 8,
  });

  const virtualRows = virtualizer.getVirtualItems();

  return (
    <section className="rounded-2xl bg-white p-4 shadow-card">
      <div className="sticky top-0 z-10 overflow-hidden rounded-lg bg-slate-50">
        <table className="w-full table-fixed text-left text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-3 py-2" scope="col">
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center gap-1"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
      </div>

      <div ref={parentRef} className="mt-2 max-h-[480px] overflow-auto">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <div
                key={row.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="border-b border-slate-100"
              >
                <table className="w-full table-fixed text-sm text-slate-700">
                  <tbody>
                    <tr>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-3 py-3 align-middle">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Showing {patients.length} patients in virtualized list mode.
      </p>
    </section>
  );
}
