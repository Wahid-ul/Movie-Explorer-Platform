import { Box, TextField } from "@mui/material";
// import { setSearch } from "../features/filters/movieFilterSlice";

export default function MovieFilters() {

  return (
    <Box display="flex" gap={2} mb={3}>
      <TextField
        label="Search movie"
        size="small"
        // onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      {/* Next: Genre, Actor, Director dropdowns (lazy loaded from backend) */}
    </Box>
  );
}
