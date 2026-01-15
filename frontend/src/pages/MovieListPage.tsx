// pages/MovieListPage.tsx
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  TextField,
  Stack,
  CircularProgress,
  Button,
} from "@mui/material";
import { setFilter, resetFilter, type MovieFilterState } from "../features/filters/movieFilterSlice";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import type { RootState } from "../app/store";

export default function MovieListPage() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.movieFilters);
  const { data: movies, isLoading, error } = useMovies();

  const handleInputChange = (field: keyof MovieFilterState, value: string) => {
    dispatch(setFilter({ [field]: value }));
  };

  const handleReset = () => {
    dispatch(resetFilter());
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={2}>
        Movies
      </Typography>

      {/* Filters */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
        <TextField
          label="Genre"
          value={filters.genre || ""}
          onChange={(e) => handleInputChange("genre", e.target.value)}
          size="small"
        />
        <TextField
          label="Actor"
          value={filters.actor || ""}
          onChange={(e) => handleInputChange("actor", e.target.value)}
          size="small"
        />
        <TextField
          label="Director"
          value={filters.director || ""}
          onChange={(e) => handleInputChange("director", e.target.value)}
          size="small"
        />
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Stack>

      {/* Movie List */}
      {isLoading && <CircularProgress />}
      {error && <Typography color="error">{error.message}</Typography>}
      <Stack spacing={2}>
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Stack>
    </Container>
  );
}
