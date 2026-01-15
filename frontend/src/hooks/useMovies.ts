import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { Movie } from "../types/movie";
import { apiClient } from "../api/client";

export const useMovies = () => {
  // Use the correct key from store
  const filters = useSelector((state: RootState) => state.movieFilters);

  return useQuery<Movie[], Error>({
    queryKey: ["movies", filters],
    queryFn: async () => {
      const { data } = await apiClient.get<Movie[]>("/movies", { params: filters });
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 mins
  });
};
