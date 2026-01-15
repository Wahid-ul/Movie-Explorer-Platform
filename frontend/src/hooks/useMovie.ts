import { useQuery } from "@tanstack/react-query";
import type { Movie } from "../types/movie";
import { apiClient } from "../api/client";

export const useMovie = (id: string) => {
  return useQuery<Movie, Error>({
    queryKey: ["movie", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Movie>(`/movies/${id}`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
