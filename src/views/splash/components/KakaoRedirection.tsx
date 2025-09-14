import { useNavigate } from "react-router-dom";

import { postKakaoLogin } from "@/api/splash/socialLogin.ts";

const KakaoRedirection = () => {
  const navigate = useNavigate();

  const code = new URL(document.location.toString()).searchParams.get("code");
  postKakaoLogin(code!).then((response) => {
    localStorage.setItem("accessToken", response.data.data.accessToken);

    navigate("/project");
  });

  return <div>카카오 로그인 중...</div>;
};

export default KakaoRedirection;
