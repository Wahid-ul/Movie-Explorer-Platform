import { useQuery } from "@tanstack/react-query";
import type { Actor } from "../types/actor";
import { apiClient } from "../api/client";

export interface ActorFilter {
  name?: string;
}

export const useActors = (filters?: ActorFilter) => {
  const params = filters || {};

  return useQuery<Actor[], Error>({
    queryKey: ["actors", params],
    queryFn: async () => {
      const { data } = await apiClient.get<Actor[]>("/actors", { params });
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
