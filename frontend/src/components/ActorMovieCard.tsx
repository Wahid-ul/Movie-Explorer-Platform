import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ActorMovie {
  id: number;
  title: string;
  poster_url: string;
  movie_poster_url: string;
  rating: number;
  release_year: number;
}

export default function ActorMovieCard({ movie }: { movie: ActorMovie }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{
        scale: 1.2,
        y: -24,
        zIndex: 20,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={() => navigate(`/movies/${movie.id}`)}
      style={{
        cursor: "pointer",
        position: "relative",
        transformOrigin: "center center",
      }}
    >
      <Box
        sx={{
          width: 240,
          height: 360,
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          backgroundImage: `url(http://localhost:5000${movie.poster_url || movie.movie_poster_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        }}
      >
        {/* Hover Overlay */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: 3,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2), transparent)",
            color: "#fff",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            backdropFilter: "blur(2px)",
          }}
        >
          <Typography fontWeight="bold">{movie.title}</Typography>
          <Typography variant="body2">
            {movie.release_year} • ⭐ {movie.rating}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}
