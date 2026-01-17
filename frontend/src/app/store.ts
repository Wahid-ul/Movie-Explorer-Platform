import { configureStore } from "@reduxjs/toolkit";
import movieFilterReducer from "../features/filters/movieFilterSlice";
import favouriteReducer from "../features/favourites/favouriteSlice";
import watchLaterReducer from "../features/watchLater/watchLaterSlice";

export const store = configureStore({
  reducer: {

    movieFilters: movieFilterReducer,
    favourites: favouriteReducer,
    watchLater: watchLaterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
