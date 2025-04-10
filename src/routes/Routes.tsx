import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import ProjectPage from "@/views/main/page/ProjectPage";
import SplashPage from "@/views/splash/page/SplashPage";
import RecordPage from "@/views/main/page/RecordPage";
import SummaryPage from "@/views/main/page/SummaryPage";
import ProtectedRoute from "@/routes/ProtectedRoute";

const Router = () => {
  const [userInfo, setUserInfo] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUserInfo(true);
    } else {
      setUserInfo(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* 홈 페이지는 ProtectedRoute 없이 직접 접근 가능 */}
        <Route path="/" element={<SplashPage />} />

        {/* 인증이 필요한 페이지에만 ProtectedRoute 적용 */}
        <Route
          path="/project"
          element={
            userInfo ? (
              <ProjectPage />
            ) : (
              <ProtectedRoute
                isRoot={false}
                userInfo={userInfo}
                children={<ProjectPage />}
              />
            )
          }
        />
        <Route
          path="/record"
          element={
            userInfo ? (
              <RecordPage />
            ) : (
              <ProtectedRoute
                isRoot={false}
                userInfo={userInfo}
                children={<RecordPage />}
              />
            )
          }
        />
        <Route
          path="/summary"
          element={
            userInfo ? (
              <SummaryPage />
            ) : (
              <ProtectedRoute
                isRoot={false}
                userInfo={userInfo}
                children={<SummaryPage />}
              />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
