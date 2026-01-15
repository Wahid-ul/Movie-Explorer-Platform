import { Container, CircularProgress, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useMovies } from "../api/movies";
import MovieCard from "../components/MovieCard";
import MovieFilters from "../components/MovieFilters";

export default function MoviesPage() {
  const filters = useSelector((state: RootState) => state.movieFilters);
  const { data, isLoading, error } = useMovies(filters);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <MovieFilters />

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Failed to load movies</Alert>}

      {data?.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Container>
  );
}
