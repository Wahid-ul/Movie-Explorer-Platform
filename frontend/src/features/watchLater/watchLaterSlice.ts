import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; 
import type { Movie } from "../../types/movie";

interface WatchLaterState {
  items: Movie[];
}

const initialState: WatchLaterState = {
  items: [],
};

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState,
  reducers: {
    toggleWatchLater(state, action: PayloadAction<Movie>) {
      const exists = state.items.find(m => m.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(m => m.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleWatchLater } = watchLaterSlice.actions;
export default watchLaterSlice.reducer;
