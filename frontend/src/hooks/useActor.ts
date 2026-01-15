import { useQuery } from "@tanstack/react-query";
import type { Actor } from "../types/actor";
import { apiClient } from "../api/client";

export const useActor = (id: string) => {
  return useQuery<Actor, Error>({
    queryKey: ["actor", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Actor>(`/actors/${id}`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
