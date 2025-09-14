import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { postGoogleLogin } from "@/api/splash/socialLogin.ts";

import AgreeModal from "@/views/splash/components/AgreeModal.tsx";

const GoogleRedirection = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<number | null>(null);
  const code = new URL(document.location.toString()).searchParams.get("code");

  postGoogleLogin(code!).then((response) => {
    localStorage.setItem("accessToken", response.data.data.accessToken);
    setStatus(response.status);

    status === 200 && navigate("/project");
  });

  return status === 200 ? (
    <div>카카오 로그인 중...</div>
  ) : (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          navigate(-1);
        }
      }}
    >
      <AgreeModal onCloseModal={() => navigate(-1)} isGoogle={true} />
    </div>
  );
};

export default GoogleRedirection;
