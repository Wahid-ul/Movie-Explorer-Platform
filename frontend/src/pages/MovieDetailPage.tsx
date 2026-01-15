import { useParams, Link } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Typography,
  Chip,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useMovie } from "../hooks/useMovie";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading } = useMovie(id!);

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  if (!movie) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight={600}>
          {movie.title}
        </Typography>

        <Typography color="text.secondary" mb={2}>
          {movie.release_year}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1">
          Director:{" "}
          <Link to={`/directors/${movie.director.id}`}>
            {movie.director.name}
          </Link>
        </Typography>

        <Box mt={2}>
          <Typography variant="subtitle2">Genres</Typography>
          <Stack direction="row" spacing={1} mt={1}>
            {movie.genres.map((g) => (
              <Chip key={g.id} label={g.name} />
            ))}
          </Stack>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle2">Cast</Typography>
          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
            {movie.actors.map((a) => (
              <Chip
                key={a.id}
                label={a.name}
                component={Link}
                to={`/actors/${a.id}`}
                clickable
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </motion.div>
  );
}
