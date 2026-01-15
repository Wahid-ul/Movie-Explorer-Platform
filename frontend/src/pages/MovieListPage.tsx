import { Container, Box, Typography } from "@mui/material";
import { useMovies } from "../hooks/useMovies";
import MovieSection from "../components/MovieSection";

export default function MovieListPage() {
  const { data: movies, isLoading } = useMovies();

  if (isLoading) return <p>Loading...</p>;

  const hollywood = movies?.filter((m) => m.industry === "Hollywood") || [];
  const bollywood = movies?.filter((m) => m.industry === "Bollywood") || [];
  const tamil = movies?.filter((m) => m.industry === "Tamil") || [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top, #2b0000 0%, #0b0b0b 40%),
          linear-gradient(180deg, #141414 0%, #000000 100%)
        `,
        py: 6,
      }}
    >
      <Container>
        <MovieSection title="Hollywood" movies={hollywood} />
        <MovieSection title="Bollywood" movies={bollywood} />
        <MovieSection title="Tamil Movies" movies={tamil} />
      </Container>
    </Box>
  );
}
