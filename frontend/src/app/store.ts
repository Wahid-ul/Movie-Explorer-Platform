import { configureStore } from "@reduxjs/toolkit";
import movieFilterReducer from "../features/filters/movieFilterSlice";

export const store = configureStore({
  reducer: {
    
    movieFilters: movieFilterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
