import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isRoot: boolean;
  userInfo: boolean | null;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isRoot,
  userInfo,
  children,
}) => {
  if (!userInfo && !isRoot) {
    alert("로그인 후 이용해주세요.");
    // 유저 정보가 없다면 홈으로! 혹은 로그인페이지로 가게 할 수 있음
    return <Navigate to="/" replace={true} />;
  }

  // 유저 정보가 있다면 자식 컴포넌트를 보여줌
  return children;
};

export default ProtectedRoute;
