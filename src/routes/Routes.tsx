import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProjectPage from "@/views/main/page/ProjectPage";
import SplashPage from "@/views/splash/page/SplashPage";
import RecordPage from "@/views/main/page/RecordPage";
import SummaryPage from "@/views/main/page/SummaryPage";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/project" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
        <Route path="/record" element={<ProtectedRoute><RecordPage /></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><SummaryPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
