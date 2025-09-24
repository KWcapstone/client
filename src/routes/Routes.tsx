import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProjectPage from "@/views/main/page/ProjectPage";
import ProjectViewPage from "@/views/main/page/ProjrctViewPage";
import SplashRedirect from "./SplashRedirect";
import RecordPage from "@/views/main/page/RecordPage";
import SummaryPage from "@/views/main/page/SummaryPage";
import MeetingPage from "@/views/meeting/page/MeetingPage";
import InvitePage from "@/views/invite/page/InvitePage";
import ProtectedRoute from "./ProtectedRoute";
import KakaoRedirection from "@/views/splash/components/KakaoRedirection";
import NaverRedirection from "@/views/splash/components/NaverRedirection";
import GoogleRedirection from "@/views/splash/components/GoogleRedirection";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashRedirect />} />
        <Route path="/oauth/kakao" element={<KakaoRedirection />} />
        <Route path="/api/login/naver" element={<NaverRedirection />} />
        <Route path="/auth/login/google" element={<GoogleRedirection />} />
        <Route
          path="/project"
          element={
            <ProtectedRoute>
              <ProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:projectID"
          element={
            <ProtectedRoute>
              <ProjectViewPage />
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
        <Route
          path="/main/project/:projectID/add_by_link"
          element={<InvitePage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
