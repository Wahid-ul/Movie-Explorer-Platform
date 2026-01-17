import { Box, Typography, Chip, Stack, IconButton, Container } from "@mui/material";
import { Favorite, WatchLater } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useParams,useNavigate  } from "react-router-dom";
import { useMovie } from "../hooks/useMovie";
import { toggleWatchLater } from "../features/watchLater/watchLaterSlice";
import { toggleFavourite } from "../features/favourites/favouriteSlice";
import type { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";


export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading } = useMovie(id!);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isWatchLater = useSelector((s: RootState) =>
    movie ? s.watchLater.items.some((m) => m.id === movie.id) : false
  );
  const isFavourite = useSelector((s: RootState) =>
    movie ? s.favourites.items.some((m) => m.id === movie.id) : false
  );

  if (isLoading) return <LoadingScreen />;
  if (!movie) return <p>Movie not found</p>;
  


  return (
    <>
      {/* HERO SECTION */}
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url(http://localhost:5000${movie.movie_poster_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.25))",
          }}
        />

        {/* Hero Content */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            position: "absolute",
            bottom: 40,
            left: 40,
            color: "white",
            maxWidth: 700,
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {movie.title}
          </Typography>

          <Typography sx={{ opacity: 0.85 }}>
            ⭐ {movie.rating} • {movie.release_year}
          </Typography>

          <Stack direction="row" spacing={1} mt={1}>
            {movie.genres.map((g) => (
              <Chip key={g.id} label={g.name} color="error" />
            ))}
          </Stack>

          <Stack direction="row" spacing={2} mt={2}>
            <IconButton
              sx={{ color: isWatchLater ? "#00e5ff" : "white" }}
              onClick={() => dispatch(toggleWatchLater(movie))}
            >
              <WatchLater />
            </IconButton>
            <IconButton
              sx={{ color: isFavourite ? "#e50914" : "white" }}
              onClick={() => dispatch(toggleFavourite(movie))}
            >
              <Favorite />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      {/* BELOW HERO – SCROLL CONTENT */}
      <Container sx={{ py: 6 }}>

        {/* Movie description box */}
        <Box
          sx={{
            mb: 5,
            p: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg, #1c1c1c, #0f0f0f)",
            color: "#e5e5e5",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            About the movie
          </Typography>

          <Box
            sx={{
              backdropFilter: "blur(6px)",
              background: "rgba(0,0,0,0.35)",
              borderRadius: 3,
              p: 3,
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            }}
          >
            <Typography
              sx={{
                fontSize: 17,
                lineHeight: 1.8,
                fontWeight: 400,
                letterSpacing: "0.4px",
                color: "rgba(255,255,255,0.9)",
                textShadow: "0px 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              {movie.movie_description || "..."}
            </Typography>
          </Box>

        </Box>

        {/* Director Section */}
        <Typography variant="h6" gutterBottom sx={{ color: "#fff", mt: 4 }}>
          Director
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <Box
            component="img"
            src={`http://localhost:5000${movie.director.director_cast_image_url}`}
            alt={movie.director.name}
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          />
          <Typography
                sx={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.85)",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#e50914",
                  },
                }}
                onClick={() => navigate(`/directors/${movie.director.id}`)}
              >
                {movie.director.name}
              </Typography>

        </Box>

        {/* Cast Section */}
        <Typography variant="h6" gutterBottom >
          Cast & Crew
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {movie.actors.map((actor) => (
            <Box
              key={actor.id}
              sx={{
                textAlign: "center",
                minWidth: 90,
              }}
            >
              <Box
                component="img"
                src={`http://localhost:5000${actor.actor_cast_image_url}`}
                alt={actor.name}
                sx={{
                  width: 80,
                  height: 80,
                  
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.6)",
                  border: "2px solid rgba(255,255,255,0.15)",
                  mb: 1,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.85)",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#e50914",
                  },
                }}
                onClick={() => navigate(`/actors/${actor.id}`)}
              >
                {actor.name}
              </Typography>

            </Box>
          ))}
        </Box>


      </Container>
    </>
  );
}
