export interface Movie {
  id: number;
  title: string;
  release_year: number;
  poster_url: string;
  industry: "Hollywood" | "Bollywood" | "Tamil";
  genres: { id: number; name: string }[];
  director: { id: number; name: string };
  actors: { id: number; name: string }[];
}
