export type PatientStatus = "stable" | "critical" | "discharged" | "pending";
export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface Vitals {
  readonly heartRate: number;
  readonly bloodPressure: string;
  readonly temperature: number;
  readonly oxygenSat: number;
  readonly recordedAt: string;
}

export interface PatientTimelineEvent {
  readonly id: string;
  readonly timestamp: string;
  readonly title: string;
  readonly description: string;
}

export interface Patient {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dob: string;
  readonly age: number;
  readonly gender: "M" | "F" | "Other";
  readonly bloodType: BloodType;
  readonly ward: string;
  readonly bed: string;
  readonly admittedOn: string;
  readonly diagnosis: string;
  readonly status: PatientStatus;
  readonly doctor: string;
  readonly vitals: Vitals;
  readonly allergies: readonly string[];
  readonly notes: string;
  readonly timeline: readonly PatientTimelineEvent[];
  readonly avatarUrl?: string;
}
