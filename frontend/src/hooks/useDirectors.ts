import { useQuery } from "@tanstack/react-query";
import type { Director } from "../types/director";
import { apiClient } from "../api/client";

export interface DirectorFilter {
  name?: string;
}

export const useDirectors = (filters?: DirectorFilter) => {
  const params = filters || {};

  return useQuery<Director[], Error>({
    queryKey: ["directors", params],
    queryFn: async () => {
      const { data } = await apiClient.get<Director[]>("/directors", { params });
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
