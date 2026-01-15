// pages/DirectorProfilePage.tsx
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Stack,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { useDirector } from "../hooks/useDirector";

export default function DirectorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: director, isLoading, error } = useDirector(id!);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;
  if (!director) return null;

  return (
    <Container sx={{ mt: 4 }}>
      {/* Director Info */}
      <Typography variant="h3">{director.name}</Typography>
      {director.birth_year && (
        <Typography variant="subtitle1">Born: {director.birth_year}</Typography>
      )}
      {director.bio && <Typography paragraph>{director.bio}</Typography>}

      {/* Director Movies */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Movies Directed
      </Typography>
      <Stack spacing={2}>
        {director.movies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              component={RouterLink}
              to={`/movies/${movie.id}`}
              sx={{ textDecoration: "none", borderRadius: 3 }}
            >
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.release_year} • Actors:{" "}
                  {movie.actors.map((a) => a.name).join(", ")}
                </Typography>
                <Stack direction="row" spacing={1} mt={1}>
                  {movie.genres.map((g) => (
                    <Chip key={g.id} label={g.name} size="small" />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Stack>
    </Container>
  );
}
