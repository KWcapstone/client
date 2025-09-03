import { useNavigate } from "react-router-dom";

import { postKakaoLogin } from "@/api/splash/socialLogin.ts";

const KakaoRedirection = () => {
  const navigate = useNavigate();

  const code = new URL(document.location.toString()).searchParams.get("code");
  postKakaoLogin(code!).then((response) => {
    localStorage.setItem("accessToken", response.data.data.accessToken);

    navigate("/project");
  });

  return <div>Redirecting to Kakao...</div>;
};

export default KakaoRedirection;
