import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { Movie } from "../types/movie";
import { apiClient } from "../api/client";

export const useMovies = () => {
  const filters = useSelector((state: RootState) => state.movieFilters);

  return useQuery<Movie[], Error>({
    queryKey: ["movies", filters],   // searchType now part of cache key
    queryFn: async () => {
      const { data } = await apiClient.get<Movie[]>("/movies", {
        params: {
          search: filters.search || undefined,
          searchType: filters.searchType || "all",
          genre: filters.genre,
          actor: filters.actor,
          director: filters.director,
          year: filters.year,
        },
      });
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
