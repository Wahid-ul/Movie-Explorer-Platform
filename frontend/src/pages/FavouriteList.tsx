import { Container, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import MovieCard from "../components/MovieCard";

export default function FavouriteList() {
  const movies = useSelector((s: RootState) => s.favourites.items);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" mb={3} color="white">
        Favourites
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 3,
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </Container>
  );
}
