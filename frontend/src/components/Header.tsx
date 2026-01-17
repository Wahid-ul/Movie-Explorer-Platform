import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Stack,
  Select,
  MenuItem
} from "@mui/material";
import { Search, Home, Favorite, WatchLater } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../features/filters/movieFilterSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [genre, setGenre] = useState("");
  const [searchType, setSearchType] = useState<"all" | "movie" | "actor" | "director">("all");
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(12px)",
        boxShadow: "none",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#e50914", cursor: "pointer", letterSpacing: 1 }}
          onClick={() => navigate("/")}
        >
          CineVerse
        </Typography>

        {/* Center: Search  */}
        <Box display="flex" alignItems="center" gap={2}>
          
          {/* Search */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              backgroundColor: alpha("#fff", 0.08),
              px: 2,
              py: 0.6,
              borderRadius: 30,
              width: 420,
              maxWidth: "55%",
            }}
          >
            <Search sx={{ color: "rgba(255,255,255,0.7)" }} />

            <InputBase
              placeholder="Search movies, actors, directors…"
              sx={{ color: "white", flex: 1 }}
              onChange={(e) => dispatch(setFilter({ search: e.target.value || undefined }))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(setFilter({ search: (e.target as HTMLInputElement).value || undefined }));
                }
              }}
            />
            <Select
              size="small"
              value={searchType}
              onChange={(e) => {
                const value = e.target.value as any;
                setSearchType(value);
                dispatch(setFilter({ searchType: value }));
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="movie">Movies</MenuItem>
              <MenuItem value="actor">Actors</MenuItem>
              <MenuItem value="director">Directors</MenuItem>
            </Select>
          </Box>

          {/* Genre Filter */}
          <Select
            size="small"
            value={genre}
            onChange={(e) => {
              const value = e.target.value;
              setGenre(value);
              dispatch(setFilter({ genre: value || undefined }));
            }}
            sx={{
              color: "white",
              borderRadius: 20,
              minWidth: 130,
              background: "rgba(255,255,255,0.1)",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            }}
          >
            <MenuItem value="">All Genres</MenuItem>
            <MenuItem value="Action">Action</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
          </Select>
        </Box>

        {/* Right Icons */}
        <Stack direction="row" spacing={1}>
          <IconButton sx={{ color: "white" }} onClick={() => navigate("/")}>
            <Home />
          </IconButton>
          <IconButton sx={{ color: "white" }} onClick={() => navigate("/watchlist")}>
            <WatchLater />
          </IconButton>
          <IconButton sx={{ color: "#e50914" }} onClick={() => navigate("/favorites")}>
            <Favorite />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
