import "@/views/splash/style/signup-modal.sass";
import Modal from "@/views/components/modal";
import { useState, useEffect } from "react";

import arrow_back from "@/assets/imgs/icon/arrow_back_outlined.svg";
import pw_show from "@/assets/imgs/icon/pw_show.svg";
import pw_hide from "@/assets/imgs/icon/pw_hide.svg";

import {
  postEmailVerification,
  postEmailduplication,
} from "@/api/splash/signup";

interface LoginModalProps {
  onCloseModal: () => void;
  onOpenLogin: () => void;
  onOpenAgree: () => void;
}

const SignupModal = ({
  onCloseModal,
  onOpenLogin,
  onOpenAgree,
}: LoginModalProps) => {
  const [active, setActive] = useState(false);

  const [nameValue, setNameInput] = useState("");
  const [emailValue, setEmailInput] = useState("");
  const [codeValue, setCodeInput] = useState("");
  const [pwValue, setPwInput] = useState("");
  const [pwShow, setPwShow] = useState(false);
  const [pwConfirmValue, setPwConfirmInput] = useState("");
  const [pwConfirmShow, setPwConfirmShow] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwConfirmError, setPwConfirmError] = useState("");

  const [nextBtnShake, setNextBtnShake] = useState(false);
  const [codeBtnShake, setCodeBtnShake] = useState(false);

  useEffect(() => {
    setActive(
      nameValue.length >= 1 &&
        emailValue.includes("@") &&
        codeValue.length >= 1 &&
        pwValue.length >= 8 &&
        pwConfirmValue === pwValue &&
        isValidPassword(pwValue)
    );
  }, [nameValue, emailValue, codeValue, pwValue, pwConfirmValue]);

  useEffect(() => {
    setNameError("");
  }, [nameValue]);

  useEffect(() => {
    setEmailError("");
  }, [emailValue]);

  useEffect(() => {
    setCodeError("");
  }, [codeValue]);

  useEffect(() => {
    setPwError("");
  }, [pwValue]);

  useEffect(() => {
    setPwConfirmError("");
  }, [pwValue]);

  // 로그인 버튼 애니메이션
  const triggerShake = () => {
    setNextBtnShake(true);
    setTimeout(() => setNextBtnShake(false), 500);
  };

  // 인증코드 버튼 애니메이션
  const triggerCodeShake = () => {
    setCodeBtnShake(true);
    setTimeout(() => setCodeBtnShake(false), 500);
  };

  // 비밀번호 유효성 검사
  const isValidPassword = (pw: string) => {
    const lengthValid = pw.length >= 8 && pw.length <= 15;

    const hasLetter = /[a-zA-Z]/.test(pw);
    const hasNumber = /[0-9]/.test(pw);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pw);

    const conditionCount = [hasLetter, hasNumber, hasSpecial].filter(
      Boolean
    ).length;

    return lengthValid && conditionCount >= 2;
  };

  const handleSignupClick = () => {
    let hasError = false;

    postEmailVerification({
      email: emailValue,
      code: Number(codeValue),
    })
      .then((response) => {
        console.log("인증코드 확인 성공", response);
      })
      .catch((error) => {
        console.error("인증코드 확인 실패", error);
        // 인증코드 확인 실패 처리
        hasError = true;
        if (error.response.status === 400) {
          setCodeError(error.response.data.message);
        } else if (error.response.status === 500) {
          setCodeError("서버오류. 관리자에게 문의하세요.");
        }
      });

    if (!nameValue) {
      setNameError("이름을 입력해주세요.");
      hasError = true;
    }
    if (!emailValue) {
      setEmailError("이메일을 입력해주세요.");
      hasError = true;
    } else if (!emailValue.includes("@")) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      hasError = true;
    }
    if (!codeValue) {
      setCodeError("올바른 인증코드를 입력해주세요.");
      hasError = true;
    }
    if (!pwValue) {
      setPwError("비밀번호를 입력해주세요.");
      hasError = true;
    } else if (!isValidPassword(pwValue)) {
      setPwError("비밀번호가 조건에 만족하지 않습니다.");
      hasError = true;
    }

    if (!pwConfirmValue) {
      setPwConfirmError("비밀번호를 다시 입력해주세요.");
      hasError = true;
    } else if (pwValue !== pwConfirmValue) {
      setPwConfirmError("비밀번호가 일치하지 않습니다.");
      hasError = true;
    }

    if (hasError) {
      triggerShake();
      return;
    }
    // 추후 회원가입 실패 시 에러 메시지 표시
    localStorage.setItem("name", nameValue);
    localStorage.setItem("email", emailValue);
    localStorage.setItem("password", pwValue);

    // 회원가입 성공 시
    console.log("회원가입 성공!");
    onOpenAgree();
  };

  const handleCodeClick = () => {
    let hasError = false;
    if (!emailValue) {
      setEmailError("이메일을 입력해주세요.");
      hasError = true;
    } else if (!emailValue.includes("@")) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      hasError = true;
    }
    if (hasError) {
      triggerCodeShake();
      return;
    }
    // 인증코드 발송 로직
    setEmailError("");
    postEmailduplication(emailValue)
      .then((response) => {
        alert("인증코드가 발송되었습니다.");
        console.log("이메일 중복 확인 성공", response);
        setCodeInput("");
      })
      .catch((error) => {
        console.error("이메일 중복 확인 실패", error);

        if (error.response.status === 400) {
          setEmailError(error.response.data.message);
        } else if (error.response.status === 422) {
          setEmailError("이메일 형식이 올바르지 않습니다.");
        } else {
          setEmailError("이메일 인증 오류 발생. 관리자에게 문의하세요.");
        }
      });

    // 인증코드 발송 성공 시
    // 인증코드 입력란 활성화
  };

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeInput(e.target.value);
    if (e.target.value.length >= 1) {
      setCodeError("");
    }
  };
  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    if (e.target.value.length >= 1) {
      setNameError("");
    }
  };
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    if (e.target.value.length >= 1) {
      setEmailError("");
    }
  };
  const handlePwInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwInput(e.target.value);
    if (e.target.value.length >= 8) {
      setPwError("");
    }
  };
  const handlePwConfirmInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwConfirmInput(e.target.value);
    if (e.target.value === pwValue) {
      setPwConfirmError("");
    }
  };

  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="modal-header">
        <img src={arrow_back} alt="뒤로가기" onClick={onOpenLogin} />
        <p className="modal-title">회원가입</p>
      </div>
      <form className="modal-form">
        <div className="modal-input-wrap">
          <div className="modal-inputs-wrap">
            <label htmlFor="name" className="modal-input-label">
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력해주세요"
              className={
                nameError ? "modal-input modal-input-error" : "modal-input"
              }
              onChange={handleNameInput}
            />
            {nameError && <p className="modal-error">{nameError}</p>}
          </div>
          <div className="modal-inputs-wrap">
            <label htmlFor="email" className="modal-input-label">
              이메일
            </label>
            <div className="modal-email-wrap">
              <div className="modal-email">
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  className={
                    emailError ? "modal-input modal-input-error" : "modal-input"
                  }
                  onChange={handleEmailInput}
                />
                <button
                  type="button"
                  className={
                    emailValue.length < 1
                      ? `modal-code-btn ${codeBtnShake ? "shake" : ""}`
                      : "modal-code-btn modal-code-btn-enable"
                  }
                  onClick={handleCodeClick}
                >
                  인증코드 받기
                </button>
              </div>
              {emailError && <p className="modal-error">{emailError}</p>}
            </div>
            <input
              type="text"
              id="code"
              placeholder="인증코드를 입력해주세요"
              className={
                codeError ? "modal-input modal-input-error" : "modal-input"
              }
              onChange={handleCodeInput}
            />
            {codeError && <p className="modal-error">{codeError}</p>}
          </div>
          <div className="modal-inputs-wrap">
            <label htmlFor="password" className="modal-input-label">
              비밀번호
            </label>
            <div className="modal-input-pw-wrap">
              <input
                type={pwShow ? "text" : "password"}
                id="password"
                placeholder="비밀번호를 입력해주세요"
                className={
                  pwError ? "modal-input modal-input-error" : "modal-input"
                }
                onChange={handlePwInput}
              />
              <img
                src={pwShow ? pw_show : pw_hide}
                alt="비밀번호 보기"
                className="password-eye"
                onClick={() => {
                  setPwShow(!pwShow);
                }}
              />
            </div>
            {pwError && <p className="modal-error">{pwError}</p>}
            <p className="modal-pw-info">
              영문/숫자/특수문자 중 2가지 이상 조합, 8자~15자리
            </p>
          </div>
          <div className="modal-inputs-wrap">
            <div className="modal-input-pw-wrap">
              <input
                type={pwConfirmShow ? "text" : "password"}
                placeholder="비밀번호를 다시 한번 입력해주세요"
                className={
                  pwConfirmError
                    ? "modal-input modal-input-error"
                    : "modal-input"
                }
                onChange={handlePwConfirmInput}
              />
              <img
                src={pwConfirmShow ? pw_show : pw_hide}
                alt="비밀번호 보기"
                className="password-eye"
                onClick={() => {
                  setPwConfirmShow(!pwConfirmShow);
                }}
              />
            </div>
            {pwConfirmError && <p className="modal-error">{pwConfirmError}</p>}
          </div>
        </div>
        <button
          type="button"
          className={
            active
              ? `modal-signup-btn modal-login-btn-enable ${
                  nextBtnShake ? "shake" : ""
                }`
              : `modal-signup-btn modal-login-btn-disable ${
                  nextBtnShake ? "shake" : ""
                }`
          }
          onClick={handleSignupClick}
        >
          다음
        </button>
      </form>
      <div className="modal-already">
        <p className="modal-already-p">이미 계정이 있으신가요?</p>
        <span
          onClick={() => {
            onOpenLogin();
          }}
          className="modal-already-span"
        >
          로그인
        </span>
      </div>
    </Modal>
  );
};

export default SignupModal;
