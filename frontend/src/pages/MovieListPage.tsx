import { Container, Box,Typography } from "@mui/material";
import { useMovies } from "../hooks/useMovies";
import MovieSection from "../components/MovieSection";
import LoadingScreen from "../components/LoadingScreen";

export default function MovieListPage() {
  const { data: movies, isLoading,error } = useMovies();

  if (isLoading)
    return <LoadingScreen />;
     
  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={6}>
        {error.message}
      </Typography>
    );
  }
  const hollywood = movies?.filter((m) => m.industry === "Hollywood") || [];
  const bollywood = movies?.filter((m) => m.industry === "Bollywood") || [];
  const tamil = movies?.filter((m) => m.industry === "Tamil") || [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left, rgba(180,0,0,0.35), transparent 45%),
          radial-gradient(circle at bottom right, rgba(0,0,120,0.35), transparent 45%),
          linear-gradient(180deg, #0b0b0b 0%, #000000 100%)
        `,
        backgroundAttachment: "fixed", 
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
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
