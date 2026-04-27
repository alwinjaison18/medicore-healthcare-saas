import { useQuery } from "@tanstack/react-query";

import {
  fetchAnalyticsData,
  type AnalyticsDateRange,
} from "../../services/mockData";

export function useAnalyticsData(range: AnalyticsDateRange) {
  return useQuery({
    queryKey: ["analytics", range],
    queryFn: () => fetchAnalyticsData(range),
    staleTime: 60_000,
  });
}
