import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";
import { AboutPage } from "@/pages/AboutPage";
import { MapPage } from "@/pages/MapPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { RouteDetailPage } from "@/pages/RouteDetailPage";
import { RoutesPage } from "@/pages/RoutesPage";
import { SpotDetailPage } from "@/pages/SpotDetailPage";
import { SpotsPage } from "@/pages/SpotsPage";

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MapPage />} />
          <Route path="spots" element={<SpotsPage />} />
          <Route path="spots/:id" element={<SpotDetailPage />} />
          <Route path="routes" element={<RoutesPage />} />
          <Route path="routes/:id" element={<RouteDetailPage />} />
          {/* 旧エリアページは地図の県表示へ */}
          <Route path="areas/:prefectureId" element={<AreaRedirect />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function AreaRedirect() {
  const { prefectureId } = useParams();
  return <Navigate to={`/?pref=${prefectureId}`} replace />;
}
