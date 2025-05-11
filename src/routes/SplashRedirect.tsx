import { Navigate } from "react-router-dom";
import { isLoggedIn } from "@/utils/auth";
import SplashPage from "@/views/splash/page/SplashPage";

const SplashRedirect = () => {
  if (isLoggedIn()) {
    return <Navigate to="/project" replace />;
  }
  return <SplashPage />;
};

export default SplashRedirect;
