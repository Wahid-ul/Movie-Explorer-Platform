import type { Movie } from "./movie";

export interface Actor {
  id: number;
  name: string;
  bio?: string;
  birth_year?: number;
  movies: Movie[]; // list of movies this actor worked in
}
