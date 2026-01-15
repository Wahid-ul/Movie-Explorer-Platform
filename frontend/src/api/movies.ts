import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";
import type { Movie } from "../types/movie";


interface MovieFilters {
  genre?: string;
  actor?: string;
  director?: string;
}
export interface MovieQueryParams {
  genreId?: number | null;
  actorId?: number | null;
  directorId?: number | null;
  search?: string;
}
export const fetchMovies = async (params: MovieQueryParams): Promise<Movie[]> => {
  const { data } = await apiClient.get("/movies", {
    params: {
      genre: params.genreId,
      actor: params.actorId,
      director: params.directorId,
      search: params.search,
    },
  });
  return data;
};
export const getMovieById = async (id: string): Promise<Movie> => {
  const { data } = await apiClient.get(`/movies/${id}`);
  return data;
};
export const useMovies = (filters: MovieFilters) => {
  return useQuery({
    queryKey: ["movies", filters],
    queryFn: async () => {
      const { data } = await apiClient.get<Movie[]>("/movies", { params: filters });
      return data;
    }
  });
};

export const useMovie = (id: number) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Movie>(`/movies/${id}`);
      return data;
    }
  });
};
