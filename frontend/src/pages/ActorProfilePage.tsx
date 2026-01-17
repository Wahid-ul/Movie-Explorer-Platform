import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useActor } from "../hooks/useActor";
import ActorMovieCard from "../components/ActorMovieCard";

export default function ActorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: actor, isLoading } = useActor(id!);

  if (isLoading || !actor) return null;

  return (
    <>
      {/* HERO */}
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url(http://localhost:5000${actor.actor_hero_image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.25))",
          }}
        />

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            position: "absolute",
            bottom: 50,
            left: 50,
            color: "white",
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {actor.name}
          </Typography>

          
        </Box>
      </Box>

      {/* MOVIES */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" sx={{  mb: 3 }}>
          Filmography
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            pb: 4,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {actor.movies.map((movie) => (
            <ActorMovieCard key={movie.id} movie={movie} />
          ))}
        </Box>
      </Container>

    </>
  );
}
