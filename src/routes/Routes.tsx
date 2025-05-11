import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProjectPage from "@/views/main/page/ProjectPage";
import SplashRedirect from "./SplashRedirect";
import RecordPage from "@/views/main/page/RecordPage";
import SummaryPage from "@/views/main/page/SummaryPage";
import MeetingPage from "@/views/meeting/page/MeetingPage";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashRedirect />} />
        <Route path="/project" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
        <Route path="/record" element={<ProtectedRoute><RecordPage /></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><SummaryPage /></ProtectedRoute>} />
        <Route path="/meeting" element={<ProtectedRoute><MeetingPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
