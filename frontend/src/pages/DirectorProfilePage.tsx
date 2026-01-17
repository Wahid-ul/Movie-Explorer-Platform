import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDirector } from "../hooks/useDirector";
import DirectorMovieCard from "../components/DirectorMovieCard";

export default function DirectorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: director, isLoading } = useDirector(id!);

  if (isLoading) return null;
  if (!director) return null;

  return (
    <>
      {/* HERO SECTION */}
      <Box
        sx={{
          height: "80vh",
          backgroundImage: `url(http://localhost:5000${director.director_hero_image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))",
          }}
        />
        <Container
          sx={{
            position: "absolute",
            bottom: 40,
            left: 40,
            color: "#fff",
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {director.name}
          </Typography>
          <Typography sx={{ opacity: 0.85, mt: 1 }}>
            Directed {director.movies.length} {director.movies.length > 1 ? "movies" : "movie"}
          </Typography>
        </Container>
      </Box>

      {/* BELOW HERO – FILMOGRAPHY */}
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
          {director.movies.map((movie) => (
            <DirectorMovieCard key={movie.id} movie={movie} />
          ))}
        </Box>
      </Container>
    </>
  );
}
