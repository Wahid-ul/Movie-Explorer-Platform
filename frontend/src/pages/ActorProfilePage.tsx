// pages/ActorProfilePage.tsx
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
import { useActor } from "../hooks/useActor";

export default function ActorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: actor, isLoading, error } = useActor(id!);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;
  if (!actor) return null;

  return (
    <Container sx={{ mt: 4 }}>
      {/* Actor Info */}
      <Typography variant="h3">{actor.name}</Typography>
      {actor.birth_year && (
        <Typography variant="subtitle1">Born: {actor.birth_year}</Typography>
      )}
      {actor.bio && <Typography paragraph>{actor.bio}</Typography>}

      {/* Actor Movies */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Movies
      </Typography>
      <Stack spacing={2}>
        {actor.movies.map((movie) => (
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
                  {movie.release_year} • Directed by {movie.director.name}
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
