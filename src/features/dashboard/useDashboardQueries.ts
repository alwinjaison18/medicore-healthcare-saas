import { useQuery } from "@tanstack/react-query";

import {
  fetchAdmissionsTrend,
  fetchBedOccupancy,
  fetchDashboardKPIs,
  fetchRecentActivity,
} from "../../services/mockData";

export function useDashboardKPIs() {
  return useQuery({
    queryKey: ["dashboard", "kpis"],
    queryFn: fetchDashboardKPIs,
    staleTime: 30_000,
  });
}

export function useAdmissionsTrend() {
  return useQuery({
    queryKey: ["dashboard", "admissions-trend"],
    queryFn: fetchAdmissionsTrend,
    staleTime: 60_000,
  });
}

export function useBedOccupancy() {
  return useQuery({
    queryKey: ["dashboard", "bed-occupancy"],
    queryFn: fetchBedOccupancy,
    staleTime: 60_000,
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: ["dashboard", "recent-activity"],
    queryFn: fetchRecentActivity,
    refetchInterval: 60_000,
    staleTime: 15_000,
  });
}
