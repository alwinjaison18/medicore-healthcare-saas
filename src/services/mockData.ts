import type {
  BloodType,
  Patient,
  PatientStatus,
  PatientTimelineEvent,
} from "../types/patient.types";

export type DashboardDeltaType = "positive" | "negative" | "neutral";
export type DashboardColor = "teal" | "green" | "amber" | "red";

export interface DashboardKPIData {
  readonly id: string;
  readonly title: string;
  readonly value: number;
  readonly delta: number;
  readonly deltaType: DashboardDeltaType;
  readonly color: DashboardColor;
  readonly iconKey: "patients" | "alerts" | "waitTime" | "discharges";
}

export interface AdmissionsTrendPoint {
  readonly date: string;
  readonly admissions: number;
  readonly discharges: number;
}

export interface BedOccupancy {
  readonly occupied: number;
  readonly available: number;
}

export interface RecentActivityItem {
  readonly id: string;
  readonly timestamp: string;
  readonly patientId: string;
  readonly eventType: string;
  readonly staffName: string;
}

export type AnalyticsDateRange = "7d" | "30d" | "90d";

export interface DiagnosisDistributionItem {
  readonly name: string;
  readonly value: number;
  readonly color: string;
}

export interface WardOccupancyItem {
  readonly ward: string;
  readonly occupied: number;
  readonly available: number;
}

export interface ReadmissionRatePoint {
  readonly month: string;
  readonly rate: number;
}

export interface StaffRatio {
  readonly current: number;
  readonly recommended: number;
}

export interface AnalyticsData {
  readonly admissionsTrend: readonly AdmissionsTrendPoint[];
  readonly diagnosisDistribution: readonly DiagnosisDistributionItem[];
  readonly wardOccupancy: readonly WardOccupancyItem[];
  readonly readmissionRate: readonly ReadmissionRatePoint[];
  readonly staffRatio: StaffRatio;
}

const dashboardKPIs: readonly DashboardKPIData[] = [
  {
    id: "patients-today",
    title: "Total Patients Today",
    value: 142,
    delta: 12,
    deltaType: "positive",
    color: "teal",
    iconKey: "patients",
  },
  {
    id: "critical-alerts",
    title: "Critical Alerts",
    value: 8,
    delta: -2,
    deltaType: "negative",
    color: "red",
    iconKey: "alerts",
  },
  {
    id: "avg-wait-time",
    title: "Avg. Wait Time (min)",
    value: 18,
    delta: -5,
    deltaType: "positive",
    color: "amber",
    iconKey: "waitTime",
  },
  {
    id: "discharges",
    title: "Discharges Today",
    value: 24,
    delta: 3,
    deltaType: "positive",
    color: "green",
    iconKey: "discharges",
  },
];

const admissionsTrend: readonly AdmissionsTrendPoint[] = [
  { date: "Mon", admissions: 34, discharges: 24 },
  { date: "Tue", admissions: 28, discharges: 20 },
  { date: "Wed", admissions: 31, discharges: 27 },
  { date: "Thu", admissions: 40, discharges: 30 },
  { date: "Fri", admissions: 35, discharges: 29 },
  { date: "Sat", admissions: 30, discharges: 22 },
  { date: "Sun", admissions: 26, discharges: 19 },
  { date: "Mon", admissions: 29, discharges: 23 },
  { date: "Tue", admissions: 33, discharges: 26 },
  { date: "Wed", admissions: 37, discharges: 28 },
  { date: "Thu", admissions: 32, discharges: 25 },
  { date: "Fri", admissions: 38, discharges: 30 },
];

const bedOccupancy: BedOccupancy = {
  occupied: 82,
  available: 18,
};

const recentActivities: readonly RecentActivityItem[] = [
  {
    id: "act-1",
    timestamp: "10:45 AM",
    patientId: "PID-8821",
    eventType: "Lab Results Ready",
    staffName: "Nurse Collins",
  },
  {
    id: "act-2",
    timestamp: "10:30 AM",
    patientId: "PID-6634",
    eventType: "Critical Vitals Flagged",
    staffName: "Dr. Rivera",
  },
  {
    id: "act-3",
    timestamp: "10:12 AM",
    patientId: "PID-9405",
    eventType: "Discharge Approved",
    staffName: "Dr. Shah",
  },
  {
    id: "act-4",
    timestamp: "09:58 AM",
    patientId: "PID-7432",
    eventType: "Medication Updated",
    staffName: "Nurse Owen",
  },
  {
    id: "act-5",
    timestamp: "09:40 AM",
    patientId: "PID-5188",
    eventType: "Admitted to ICU",
    staffName: "Dr. Patel",
  },
  {
    id: "act-6",
    timestamp: "09:16 AM",
    patientId: "PID-3704",
    eventType: "Review Pending > 4h",
    staffName: "Coordinator Ames",
  },
];

const analyticsAdmissionsTrend90Days: readonly AdmissionsTrendPoint[] =
  Array.from({ length: 90 }, (_, index) => {
    const day = index + 1;
    const admissions = 22 + ((day * 5) % 19) + Math.floor(day / 17);
    const discharges = 16 + ((day * 4) % 15) + Math.floor(day / 22);

    return {
      date: `Day ${day}`,
      admissions,
      discharges,
    };
  });

const diagnosisDistributionBase: readonly DiagnosisDistributionItem[] = [
  { name: "Cardiac", value: 22, color: "#EF476F" },
  { name: "Respiratory", value: 18, color: "#0096C7" },
  { name: "Neurological", value: 14, color: "#7C3AED" },
  { name: "Trauma", value: 20, color: "#FFB703" },
  { name: "Oncology", value: 11, color: "#06D6A0" },
  { name: "Other", value: 15, color: "#94A3B8" },
];

const wardOccupancyBase: readonly WardOccupancyItem[] = [
  { ward: "ICU", occupied: 92, available: 8 },
  { ward: "General", occupied: 74, available: 26 },
  { ward: "Paediatrics", occupied: 66, available: 34 },
  { ward: "Maternity", occupied: 78, available: 22 },
  { ward: "Oncology", occupied: 87, available: 13 },
];

const readmissionRate12Months: readonly ReadmissionRatePoint[] = [
  { month: "Jan", rate: 16.4 },
  { month: "Feb", rate: 15.8 },
  { month: "Mar", rate: 15.2 },
  { month: "Apr", rate: 14.9 },
  { month: "May", rate: 14.6 },
  { month: "Jun", rate: 14.3 },
  { month: "Jul", rate: 14.1 },
  { month: "Aug", rate: 14.4 },
  { month: "Sep", rate: 14.0 },
  { month: "Oct", rate: 13.8 },
  { month: "Nov", rate: 13.5 },
  { month: "Dec", rate: 13.2 },
];

const staffRatioBase: StaffRatio = {
  current: 4.8,
  recommended: 4,
};

const firstNames = [
  "Eleanor",
  "Robert",
  "Mina",
  "Arjun",
  "Fatima",
  "Liam",
  "Nora",
  "Ravi",
  "Maya",
  "Ethan",
];
const lastNames = [
  "Rigby",
  "Chen",
  "Ali",
  "Shah",
  "Patel",
  "Hayes",
  "Nguyen",
  "Das",
  "Kaur",
  "Reed",
];
const wards = [
  "ICU",
  "General A",
  "General B",
  "Paediatrics",
  "Oncology",
  "Maternity",
];
const diagnoses = [
  "Acute Cardiac Arrhythmia",
  "Pneumonia",
  "Stroke",
  "Appendicitis",
  "Fracture",
  "Type 2 Diabetes",
  "Hypertension",
  "Asthma",
  "Sepsis",
  "Kidney Failure",
];
const doctors = [
  "Dr. Rivera",
  "Dr. Patel",
  "Dr. Shah",
  "Dr. Vance",
  "Dr. Morgan",
];
const allergiesPool = ["Penicillin", "Aspirin", "Latex", "Morphine", "None"];
const statuses: readonly PatientStatus[] = [
  "stable",
  "critical",
  "pending",
  "discharged",
];
const bloodTypes: readonly BloodType[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

function deterministicPick<T>(array: readonly T[], seed: number): T {
  return array[seed % array.length];
}

function buildTimeline(
  id: string,
  seed: number,
): readonly PatientTimelineEvent[] {
  return [
    {
      id: `${id}-t1`,
      timestamp: `${2 + (seed % 5)} days ago`,
      title: "Admission",
      description: "Patient admitted and triaged in emergency unit.",
    },
    {
      id: `${id}-t2`,
      timestamp: `${18 + (seed % 7)} hours ago`,
      title: "Vitals Review",
      description: "Clinical team reviewed vitals and updated plan.",
    },
    {
      id: `${id}-t3`,
      timestamp: `${1 + (seed % 4)} hours ago`,
      title: "Latest Lab Update",
      description: "Latest lab panel synchronized to patient record.",
    },
  ];
}

const mockPatients: readonly Patient[] = Array.from(
  { length: 60 },
  (_, index) => {
    const idNumber = index + 1;
    const id = `PAT-${String(idNumber).padStart(4, "0")}`;
    const firstName = deterministicPick(firstNames, idNumber);
    const lastName = deterministicPick(lastNames, idNumber * 3);
    const status = deterministicPick(statuses, idNumber * 5);
    const ward = deterministicPick(wards, idNumber * 7);
    const diagnosis = deterministicPick(diagnoses, idNumber * 2);
    const admittedDay = String((idNumber % 28) + 1).padStart(2, "0");
    const admittedMonth = String((idNumber % 9) + 1).padStart(2, "0");
    const allergies =
      idNumber % 4 === 0
        ? ["None"]
        : [
            deterministicPick(allergiesPool, idNumber),
            deterministicPick(allergiesPool, idNumber + 2),
          ].filter(
            (item, idx, arr) => item !== "None" && arr.indexOf(item) === idx,
          );

    return {
      id,
      firstName,
      lastName,
      dob: `19${70 + (idNumber % 25)}-${admittedMonth}-${admittedDay}`,
      age: 35 + (idNumber % 50),
      gender: idNumber % 3 === 0 ? "Other" : idNumber % 2 === 0 ? "F" : "M",
      bloodType: deterministicPick(bloodTypes, idNumber * 11),
      ward,
      bed: `${ward.slice(0, 2).toUpperCase()}-${(idNumber % 20) + 1}`,
      admittedOn: `2026-${admittedMonth}-${admittedDay}`,
      diagnosis,
      status,
      doctor: deterministicPick(doctors, idNumber * 13),
      vitals: {
        heartRate: 62 + (idNumber % 38),
        bloodPressure: `${108 + (idNumber % 28)}/${68 + (idNumber % 24)}`,
        temperature: Number((36.0 + (idNumber % 30) * 0.08).toFixed(1)),
        oxygenSat: 88 + (idNumber % 13),
        recordedAt: `2026-04-${String((idNumber % 28) + 1).padStart(2, "0")}T10:${String(
          (idNumber * 3) % 60,
        ).padStart(2, "0")}:00Z`,
      },
      allergies,
      notes:
        "Patient monitored under current treatment plan. Continue periodic vitals assessment.",
      timeline: buildTimeline(id, idNumber),
    };
  },
);

function randomNetworkDelay(): number {
  return 300 + Math.floor(Math.random() * 501);
}

function simulateFetch<T>(payload: T): Promise<T> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(payload);
    }, randomNetworkDelay());
  });
}

export function fetchDashboardKPIs(): Promise<readonly DashboardKPIData[]> {
  return simulateFetch(dashboardKPIs);
}

export function fetchAdmissionsTrend(): Promise<
  readonly AdmissionsTrendPoint[]
> {
  return simulateFetch(admissionsTrend);
}

export function fetchBedOccupancy(): Promise<BedOccupancy> {
  return simulateFetch(bedOccupancy);
}

export function fetchRecentActivity(): Promise<readonly RecentActivityItem[]> {
  return simulateFetch(recentActivities);
}

function getAdmissionSliceByRange(
  range: AnalyticsDateRange,
): readonly AdmissionsTrendPoint[] {
  if (range === "7d") {
    return analyticsAdmissionsTrend90Days.slice(-7);
  }

  if (range === "30d") {
    return analyticsAdmissionsTrend90Days.slice(-30);
  }

  return analyticsAdmissionsTrend90Days;
}

function withRangeModifier(value: number, range: AnalyticsDateRange): number {
  if (range === "7d") {
    return Math.max(1, Math.round(value * 0.85));
  }

  if (range === "30d") {
    return Math.max(1, Math.round(value * 0.95));
  }

  return value;
}

export function fetchAnalyticsData(
  range: AnalyticsDateRange,
): Promise<AnalyticsData> {
  const diagnosisDistribution = diagnosisDistributionBase.map((item) => ({
    ...item,
    value: withRangeModifier(item.value, range),
  }));

  const wardOccupancy = wardOccupancyBase.map((ward) => {
    const occupied = Math.min(95, withRangeModifier(ward.occupied, range));

    return {
      ...ward,
      occupied,
      available: Math.max(0, 100 - occupied),
    };
  });

  const readmissionRate =
    range === "7d"
      ? readmissionRate12Months.slice(-4)
      : range === "30d"
        ? readmissionRate12Months.slice(-8)
        : readmissionRate12Months;

  const staffRatio: StaffRatio = {
    ...staffRatioBase,
    current:
      range === "7d" ? 4.5 : range === "30d" ? 4.7 : staffRatioBase.current,
  };

  return simulateFetch({
    admissionsTrend: getAdmissionSliceByRange(range),
    diagnosisDistribution,
    wardOccupancy,
    readmissionRate,
    staffRatio,
  });
}

export function fetchMockPatients(): Promise<readonly Patient[]> {
  return simulateFetch(mockPatients);
}
