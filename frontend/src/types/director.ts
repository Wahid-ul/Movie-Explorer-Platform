import type { Movie } from "./movie";

export interface Director {
  id: number;
  name: string;
  bio?: string;
  birth_year?: number;
  movies: Movie[]; // list of movies directed
}
