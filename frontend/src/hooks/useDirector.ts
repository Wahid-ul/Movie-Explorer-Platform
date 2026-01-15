import { useQuery } from "@tanstack/react-query";
import type { Director } from "../types/director";
import { apiClient } from "../api/client";

export const useDirector = (id: string) => {
  return useQuery<Director, Error>({
    queryKey: ["director", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Director>(`/directors/${id}`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
