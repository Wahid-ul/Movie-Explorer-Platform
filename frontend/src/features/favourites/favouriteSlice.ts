import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../../types/movie";

interface FavouriteState {
  items: Movie[];
}

const initialState: FavouriteState = {
  items: [],
};

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleFavourite(state, action: PayloadAction<Movie>) {
      const exists = state.items.find(m => m.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(m => m.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
