// features/movieFilterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // ✅ type-only import


export interface MovieFilterState {
  genre?: string;
  actor?: string;
  director?: string;
  year?: number;
}

const initialState: MovieFilterState = {};

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
