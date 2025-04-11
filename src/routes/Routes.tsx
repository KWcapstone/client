import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AccessTokenContext } from "@/context/accessToken";

import ProjectPage from "@/views/main/page/ProjectPage";
import SplashPage from "@/views/splash/page/SplashPage";
import RecordPage from "@/views/main/page/RecordPage";
import SummaryPage from "@/views/main/page/SummaryPage";
import ProtectedRoute from "@/routes/ProtectedRoute";

const Router = () => {
  const { isLogin } = useContext(AccessTokenContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* 홈 페이지는 ProtectedRoute 없이 직접 접근 가능 */}
        <Route path="/" element={<SplashPage />} />

        {/* 인증이 필요한 페이지에만 ProtectedRoute 적용 */}
        <Route
          path="/project"
          element={isLogin ? <ProjectPage /> : <ProtectedRoute />}
        />
        <Route
          path="/record"
          element={isLogin ? <RecordPage /> : <ProtectedRoute />}
        />
        <Route
          path="/summary"
          element={isLogin ? <SummaryPage /> : <ProtectedRoute />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
