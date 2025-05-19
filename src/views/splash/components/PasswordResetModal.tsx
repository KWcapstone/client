// import
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// style
import "@/views/splash/style/password-reset-modal.sass";

// component
import Modal from "@/views/components/modal";

// assets
import arrow_back from "@/assets/imgs/icon/arrow_back_outlined.svg";

//api
import { postResetPW } from "@/api/splash/resetPW";
import { postLogin } from "@/api/splash/login";

// type
import { ResetPWData } from "@/types/loginData";
import { LoginData } from "@/types/loginData";

// utils
import { setTokens } from "@/utils/auth";

interface PasswordResetModalProps {
  onCloseModal: () => void;
  onOpenLogin: () => void;
}

const PasswordResetModal = ({
  onCloseModal,
  onOpenLogin,
}: PasswordResetModalProps) => {
  const navigate = useNavigate();

  const [active, setActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);

  const [btnClicked, setBtnClicked] = useState(false);

  const [loginBtnShake, setLoginBtnShake] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginValue, setLoginInput] = useState("");

  const [emailValue, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");

  const [nameValue, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");

  const [emailBtnShake, setEmailBtnShake] = useState(false);

  useEffect(() => {
    setActive(emailValue.includes("@") && nameValue.length >= 2);
  }, [emailValue, nameValue]);

  useEffect(() => {
    setEmailError("");
  }, [emailValue]);

  useEffect(() => {
    setNameError("");
  }, [nameValue]);

  useEffect(() => {
    setLoginActive(loginValue.length >= 1);
  }, [loginValue]);

  useEffect(() => {
    setLoginError("");
  }, [loginValue]);

  // 로그인 버튼 애니메이션
  const triggerLoginShake = () => {
    setLoginBtnShake(true);
    setTimeout(() => setLoginBtnShake(false), 500);
  };

  const handleLoginClick = () => {
    let hasError = false;

    if (!loginValue) {
      setLoginError("임시 비밀번호를 입력해주세요.");
      hasError = true;
    }
    if (hasError) {
      triggerLoginShake();
      return;
    }
    // 로그인 로직 추가
    console.log("로그인");

    const data: LoginData = {
      email: emailValue,
      password: loginValue,
    };

    postLogin(data)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });

    postLogin(data)
      .then((response) => {
        setTokens(
          response.data.data.accessToken,
          response.data.data.refreshToken
        );
        onCloseModal();
        navigate("/project");
      })
      .catch((error) => {
        console.error("로그인 실패", error);
        // 로그인 실패 처리
        if (error.response.status === 401) {
          alert("비밀번호가 일치하지 않습니다.");
        } else if (error.response.status === 404) {
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      });
  };

  // 비밀번호 재설정 버튼 애니메이션
  const triggerEmailShake = () => {
    setEmailBtnShake(true);
    setTimeout(() => setEmailBtnShake(false), 500);
  };

  const handleEmailClick = () => {
    let hasError = false;
    if (!emailValue) {
      setEmailError("이메일을 입력해주세요.");
      hasError = true;
    } else if (!emailValue.includes("@")) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      hasError = true;
    }

    if (!nameValue) {
      setNameError("이름을 입력해주세요.");
      hasError = true;
    } else if (nameValue.length < 2) {
      setNameError("이름은 2자 이상이어야 합니다.");
      hasError = true;
    }

    if (hasError) {
      triggerEmailShake();
      return;
    }

    console.log("이메일 전송");

    const data: ResetPWData = {
      email: emailValue,
      name: nameValue,
    };

    postResetPW(data)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          setBtnClicked(true);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
    setBtnClicked(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (btnClicked) {
        handleLoginClick();
      } else {
        handleEmailClick();
      }
    }
  };

  return (
    <Modal onCloseModal={onCloseModal}>
      {btnClicked ? (
        <>
          <div className="modal-header">
            <img
              src={arrow_back}
              alt="뒤로가기"
              onClick={() => {
                setBtnClicked(false);
                setActive(false);
              }}
            />
            <p className="modal-title">비밀번호 재설정</p>
          </div>
          <div className="modal-contents-wrap">
            <div className="modal-contents">
              입력하신 이메일로 임시 비밀번호를 전송했습니다.
              <br />
              임시 비밀번호를 입력하여 로그인을 완료해주세요.
            </div>
            <div className="modal-contents2">
              비밀번호 변경은 설정 페이지에서 가능합니다.
            </div>
          </div>
          <div className="input-wrap">
            <label htmlFor="email" className="modal-input-label">
              임시 비밀번호
            </label>
            <input
              type="text"
              placeholder="전송된 임시 비밀번호를 입력해주세요"
              className={
                loginError ? "modal-input modal-input-error" : "modal-input"
              }
              value={loginValue}
              onChange={(e) => setLoginInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {loginError && <p className="modal-error">{loginError}</p>}
          </div>
          <button
            className={
              loginActive
                ? `pwd-rst-button modal-email-btn-enable ${
                    loginBtnShake ? "shake" : ""
                  }`
                : `pwd-rst-button modal-email-btn-disable ${
                    loginBtnShake ? "shake" : ""
                  }`
            }
            onClick={handleLoginClick}
          >
            로그인하기
          </button>
        </>
      ) : (
        <>
          <div className="modal-header">
            <img src={arrow_back} alt="뒤로가기" onClick={onOpenLogin} />
            <p className="modal-title">비밀번호 재설정</p>
          </div>
          <div className="modal-contents modal-contents-margin">
            기존 이메일과 이름을 입력하시면 <br />
            비밀번호 변경 메일을 발송해드립니다.
          </div>
          <div className="input-wrap">
            <label htmlFor="email" className="modal-input-label">
              기존 이메일
            </label>
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              className={
                emailError ? "modal-input modal-input-error" : "modal-input"
              }
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {emailError && <p className="modal-error">{emailError}</p>}
          </div>
          <div className="input-wrap">
            <label htmlFor="name" className="modal-input-label">
              이름
            </label>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              className={
                nameError ? "modal-input modal-input-error" : "modal-input"
              }
              onChange={(e) => setNameInput(e.target.value)}
            />
            {nameError && <p className="modal-error">{nameError}</p>}
          </div>
          <button
            className={
              active
                ? `pwd-rst-button modal-email-btn-enable ${
                    emailBtnShake ? "shake" : ""
                  }`
                : `pwd-rst-button modal-email-btn-disable ${
                    emailBtnShake ? "shake" : ""
                  }`
            }
            onClick={handleEmailClick}
          >
            비밀번호 재설정 메일 받기
          </button>
        </>
      )}
    </Modal>
  );
};

export default PasswordResetModal;
