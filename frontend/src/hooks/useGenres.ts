import { useQuery } from "@tanstack/react-query";
import type { Genre } from "../types/genre";
import { apiClient } from "../api/client";
import { normalizeError } from "../api/queryError";

export interface GenreFilter {
  name?: string;
}

export const useGenres = (filters?: GenreFilter) => {
  const params = filters || {};

  return useQuery<Genre[], Error>({
    queryKey: ["genres", params],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<Genre[]>("/genres", { params });
        return data;
      } catch (err) {
        throw normalizeError(err);
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
