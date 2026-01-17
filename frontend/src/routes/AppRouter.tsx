// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import MovieListPage from "../pages/MovieListPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import ActorProfilePage from "../pages/ActorProfilePage";
import DirectorProfilePage from "../pages/DirectorProfilePage";
import WatchLater from "../pages/WatchLater";
import FavouriteList from "../pages/FavouriteList";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Default route */}
        <Route path="/" element={<MovieListPage />} />

        {/* Movie details */}
        <Route path="/movies/:id" element={<MovieDetailPage />} />

        {/* Actor / Director profiles */}
        <Route path="/actors/:id" element={<ActorProfilePage />} />
        <Route path="/directors/:id" element={<DirectorProfilePage />} />

        <Route path="/watchlist" element={<WatchLater />} />
        <Route path="/favorites" element={<FavouriteList />} />
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
