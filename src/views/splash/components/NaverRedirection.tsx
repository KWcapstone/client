import { useNavigate } from "react-router-dom";

import { postNaverLogin } from "@/api/splash/socialLogin.ts";

const NaverRedirection = () => {
  const navigate = useNavigate();

  const code = new URL(document.location.toString()).searchParams.get("code");
  postNaverLogin(code!).then((response) => {
    localStorage.setItem("accessToken", response.data.data.accessToken);

    navigate("/project");
  });

  return <div>네이버 로그인 중...</div>;
};

export default NaverRedirection;
