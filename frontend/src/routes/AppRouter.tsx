// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MovieListPage from "../pages/MovieListPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import ActorProfilePage from "../pages/ActorProfilePage";
import DirectorProfilePage from "../pages/DirectorProfilePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<MovieListPage />} />

        {/* Movie details */}
        <Route path="/movies/:id" element={<MovieDetailPage />} />

        {/* Actor / Director profiles */}
        <Route path="/actors/:id" element={<ActorProfilePage />} />
        <Route path="/directors/:id" element={<DirectorProfilePage />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
