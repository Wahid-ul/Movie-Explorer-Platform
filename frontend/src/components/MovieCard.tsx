import { Card, CardContent, Typography, Chip, Stack, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate();

  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          boxShadow: 3,
          cursor: "pointer",
          height: 220,
          position: "relative",
          backgroundImage: `url(http://localhost:5000${movie.poster_url})`,
          backgroundSize: "contain",
          backgroundColor: "#000",   
          backgroundPosition: "center",
          overflow: "hidden",
        }}
        onClick={() => navigate(`/movies/${movie.id}`)}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
          }}
        />

        <CardContent
          sx={{
            position: "relative",
            zIndex: 1,
            color: "white",
          }}
        >
          <Typography variant="h6">{movie.title}</Typography>

          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {movie.release_year} • Directed by {movie.director.name}
          </Typography>

          <Stack direction="row" spacing={1} mt={1}>
            {movie.genres.map((g) => (
              <Chip
                key={g.id}
                label={g.name}
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.85)" }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}
