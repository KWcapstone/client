import "@/views/splash/style/login-modal.sass";
import Modal from "@/views/components/modal";

import kakao_login from "@/assets/imgs/common/kakao_login.svg";
import google_login from "@/assets/imgs/common/google_login.svg";
import naver_login from "@/assets/imgs/common/naver_login.svg";
import pw_show from "@/assets/imgs/icon/pw_show.svg";
import pw_hide from "@/assets/imgs/icon/pw_hide.svg";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { postLogin } from "@/api/splash/login";
import { LoginData } from "@/types/loginData";

interface LoginModalProps {
  onCloseModal: () => void;
  onOpenSignup: () => void;
  onOpenResetPw: () => void;
}

const LoginModal = ({
  onCloseModal,
  onOpenSignup,
  onOpenResetPw,
}: LoginModalProps) => {
  const navigate = useNavigate();

  const [active, setActive] = useState(false);
  const [idValue, setIdInput] = useState("");
  const [pwValue, setPwInput] = useState("");
  const [pwShow, setPwShow] = useState(false);

  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setActive(idValue.includes("@") && pwValue.length >= 1);

    // 입력 바뀌면 에러 초기화
    setIdError("");
  }, [idValue]);

  useEffect(() => {
    setActive(idValue.includes("@") && pwValue.length >= 1);

    // 입력 바뀌면 에러 초기화
    setPwError("");
  }, [pwValue]);

  // 로그인 버튼 애니메이션
  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLoginClick = () => {
    let hasError = false;

    if (!idValue) {
      setIdError("이메일을 입력해주세요.");
      hasError = true;
    } else if (idValue === "test") {
    } else if (!idValue.includes("@")) {
      setIdError("올바른 이메일 형식이 아닙니다.");
      hasError = true;
    }

    if (!pwValue) {
      setPwError("비밀번호를 입력해주세요.");
      hasError = true;
    }

    if (hasError) {
      triggerShake();
      return;
    }

    // 로그인 API 호출
    const loginData: LoginData = {
      email: idValue,
      password: pwValue,
    };
    postLogin(loginData)
      .then((response) => {
        console.log("로그인 성공", response);
        // 로그인 성공 후 처리
        localStorage.setItem("accessToken", response.data.data.accessToken);
        console.log("로그인 성공!");
        onCloseModal();
        navigate("/project");
      })
      .catch((error) => {
        console.error("로그인 실패", error);
        // 로그인 실패 처리
        if (error.response.status === 401) {
          setPwError("아이디 또는 비밀번호가 일치하지 않습니다.");
          setIdError(" ");
        } else if (error.response.status === 404) {
          setPwError("아이디 또는 비밀번호가 일치하지 않습니다.");
          setIdError(" ");
        } else {
          setPwError("로그인에 실패했습니다. 다시 시도해주세요.");
          setIdError(" ");
        }
      });

    // 성공
  };

  return (
    <Modal onCloseModal={onCloseModal}>
      <p className="modal-title">로그인</p>

      <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="id" className="modal-label">
          이메일
        </label>
        <input
          id="id"
          type="text"
          placeholder="이메일을 입력해주세요"
          className={idError ? "modal-input modal-input-error" : "modal-input"}
          onChange={(e) => setIdInput(e.target.value)}
        />
        {idError && <p className="modal-error">{idError}</p>}

        <label htmlFor="password" className="modal-label">
          비밀번호
        </label>
        <div className="modal-password-input">
          <input
            id="password"
            type={pwShow ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            className={
              pwError ? "modal-input modal-input-error" : "modal-input"
            }
            onChange={(e) => setPwInput(e.target.value)}
          />
          <img
            src={pwShow ? pw_show : pw_hide}
            alt="비밀번호 보기"
            onClick={() => setPwShow(!pwShow)}
            className="password-eye"
          />
        </div>
        {pwError && <p className="modal-error">{pwError}</p>}

        <button
          type="button"
          className={
            active
              ? `modal-login-btn modal-login-btn-enable ${shake ? "shake" : ""}`
              : `modal-login-btn modal-login-btn-disable ${
                  shake ? "shake" : ""
                }`
          }
          onClick={handleLoginClick}
        >
          로그인
        </button>
      </form>

      <div className="modal-footer">
        <div
          className="modal-footer-text"
          onClick={() => {
            onOpenResetPw();
          }}
        >
          비밀번호 재설정
        </div>
        <div
          className="modal-footer-text"
          onClick={() => {
            onOpenSignup();
          }}
        >
          회원가입
        </div>
      </div>

      <div className="modal-divider">
        <hr className="modal-divider-hr" />
        SNS 계정으로 로그인
        <hr className="modal-divider-hr" />
      </div>

      <div className="modal-sns-login">
        <img src={kakao_login} alt="kakao" className="modal-sns-login-img" />
        <img src={google_login} alt="google" className="modal-sns-login-img" />
        <img src={naver_login} alt="naver" className="modal-sns-login-img" />
      </div>
    </Modal>
  );
};

export default LoginModal;
