import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProjectPage from "@/views/main/page/ProjectPage";
import SplashRedirect from "./SplashRedirect";
import RecordPage from "@/views/main/page/RecordPage";
import SummaryPage from "@/views/main/page/SummaryPage";
import MeetingPage from "@/views/meeting/page/MeetingPage";
import InvitePage from "@/views/invite/page/InvitePage";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashRedirect />} />
        <Route
          path="/project"
          element={
            <ProtectedRoute>
              <ProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/record"
          element={
            <ProtectedRoute>
              <RecordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute>
              <SummaryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meeting"
          element={
            <ProtectedRoute>
              <MeetingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main/project/:projectID/accept"
          element={<InvitePage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
