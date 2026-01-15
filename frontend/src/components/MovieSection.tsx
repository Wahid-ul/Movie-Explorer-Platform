import { Box, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import type { Movie } from "../types/movie";

export default function MovieSection({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  return (
    <Box mb={6} sx={{ overflow: "visible" }}>
      <Typography
        variant="h5"
        mb={2}
        sx={{
            fontFamily: "'Bebas Neue', 'Roboto', sans-serif",
            letterSpacing: 2,
            color: "#E5E5E5",
            textTransform: "uppercase",
        }}
        >
        {title}
        </Typography>


      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          overflowY: "visible",
          py: 4,           // top & bottom space for scale-up
          px: 1,
          position: "relative",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {movies.map((movie) => (
          <Box key={movie.id} sx={{ overflow: "visible" }}>
            <MovieCard movie={movie} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
