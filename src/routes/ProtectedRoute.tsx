import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  alert("로그인 후 이용해주세요.");
  return <Navigate to="/" replace={true} />;
};

export default ProtectedRoute;
