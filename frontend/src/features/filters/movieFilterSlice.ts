// features/movieFilterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // ✅ type-only import



export type SearchType = "all" | "movie" | "actor" | "director";

export interface MovieFilterState {
  search?: string;
  searchType?: SearchType; 
  genre?: string;
  actor?: string;
  director?: string;
  year?: number;
}

const initialState: MovieFilterState = {
  genre: undefined,
  actor: undefined,
  director: undefined,
  year: undefined,
  search: "",
  searchType: "all",
};

const movieFilterSlice = createSlice({
  name: "movieFilter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<MovieFilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilter: () => initialState,
  },
});

export const { setFilter, resetFilter } = movieFilterSlice.actions;
export default movieFilterSlice.reducer;
