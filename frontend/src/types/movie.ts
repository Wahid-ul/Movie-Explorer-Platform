export interface Movie {
  id: number;
  title: string;
  release_year: number;
  rating: number;
  poster_url: string;
  movie_poster_url: string;
  industry: "Hollywood" | "Bollywood" | "Tamil";
  genres: { id: number; name: string }[];
  director: { id: number; name: string; director_hero_image_url: string; director_cast_image_url: string } ;
  actors: { id: number; name: string; actor_hero_image_url: string; actor_cast_image_url: string }[];
  movie_description: string;
}
