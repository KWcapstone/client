// import
import { useState, useEffect } from "react";

// style
import "@/views/main/style/change-pw-modal.sass";

// component
import Modal from "@/views/components/modal";

// assets
import arrow_back from "@/assets/imgs/icon/arrow_back_outlined.svg";

//api
import { PostCheckPW, PostChangePW } from "@/api/main/changePW";

// type
interface PasswordChangeModalProps {
  onCloseModal: () => void;
  onOpenUserModal: () => void;
}

const PasswordChangeModal = ({
  onCloseModal,
  onOpenUserModal,
}: PasswordChangeModalProps) => {
  const [nextActive, setNextActive] = useState(false);
  const [nextBtnShake, setNextBtnShake] = useState(false);

  const [changeActive, setChangeActive] = useState(false);
  const [changeBtnShake, setChangeBtnShake] = useState(false);

  const [btnClicked, setBtnClicked] = useState(false);

  const [currentPWValue, setCurrentPWInput] = useState("");
  const [currentPWError, setCurrentPWError] = useState("");

  const [newPWValue, setNewPWInput] = useState("");
  const [newPWError, setNewPWError] = useState("");

  const [rePWError, setRePWError] = useState("");
  const [rePWValue, setRePWInput] = useState("");

  useEffect(() => {
    setNextActive(currentPWValue.length >= 1);
  }, [currentPWValue]);

  useEffect(() => {
    setChangeActive(
      newPWValue.length >= 8 &&
        rePWValue.length >= 8 &&
        isValidPassword(newPWValue)
    );
  }, [rePWValue, newPWValue]);

  useEffect(() => {
    setCurrentPWError("");
  }, [currentPWValue]);

  useEffect(() => {
    setNewPWError("");
  }, [newPWValue]);

  useEffect(() => {
    setRePWError("");
  }, [rePWValue]);

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

  // 현재 비밀번호 입력 모달 버튼 애니메이션
  const triggerNextShake = () => {
    setNextBtnShake(true);
    setTimeout(() => setNextBtnShake(false), 500);
  };

  const handleNextClick = () => {
    let hasError = false;
    if (!currentPWValue) {
      setCurrentPWError("현재 비밀번호를 입력해주세요.");
      hasError = true;
    }

    if (hasError) {
      triggerNextShake();
      return;
    }

    // console.log("현재 비밀번호 입력");

    PostCheckPW(currentPWValue)
      .then((res) => {
        if (res.status === 200) {
          setBtnClicked(true);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error check pw:", error);
      });
    setBtnClicked(true);
  };

  // 비밀번호 변경 버튼 애니메이션
  const triggerLoginShake = () => {
    setChangeBtnShake(true);
    setTimeout(() => setChangeBtnShake(false), 500);
  };

  const handleLoginClick = () => {
    let hasError = false;

    if (!rePWValue) {
      setRePWError("비밀번호를 재입력해주세요.");
      hasError = true;
    } else if (rePWValue !== newPWValue) {
      setRePWError("비밀번호가 일치하지 않습니다.");
      hasError = true;
    }
    if (!newPWValue) {
      setNewPWError("새로운 비밀번호를 입력해주세요.");
      hasError = true;
    } else if (!isValidPassword(newPWValue)) {
      setNewPWError("비밀번호 형식이 올바르지 않습니다.");
      hasError = true;
    }

    if (hasError) {
      triggerLoginShake();
      return;
    }

    // 변경 로직 추가
    // console.log("변경");

    PostChangePW(currentPWValue, newPWValue)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          onCloseModal();
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error change pw:", error);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (btnClicked) {
        handleLoginClick();
      } else {
        handleNextClick();
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
                setNextActive(false);
              }}
            />
            <p className="modal-title">비밀번호 변경</p>
          </div>
          <div className="input-wrap">
            <label htmlFor="email" className="modal-input-label">
              새 비밀번호
            </label>
            <input
              type="text"
              placeholder="새 비밀번호를 입력해주세요"
              className={
                newPWError ? "modal-input modal-input-error" : "modal-input"
              }
              value={newPWValue}
              onChange={(e) => setNewPWInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {newPWError && <p className="modal-error">{newPWError}</p>}
            <p className="infopw">
              영문/숫자/특수문자 중 2가지 이상 조합, 8자~15자리
            </p>
          </div>
          <div className="input-wrap">
            <input
              type="text"
              placeholder="새 비밀번호를 다시 한번 입력해주세요"
              className={
                rePWError ? "modal-input modal-input-error" : "modal-input"
              }
              value={rePWValue}
              onChange={(e) => setRePWInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {rePWError && <p className="modal-error">{rePWError}</p>}
          </div>
          <button
            className={
              changeActive
                ? `pwd-rst-button modal-email-btn-enable ${
                    changeBtnShake ? "shake" : ""
                  }`
                : `pwd-rst-button modal-email-btn-disable ${
                    changeBtnShake ? "shake" : ""
                  }`
            }
            onClick={handleLoginClick}
          >
            변경하기
          </button>
        </>
      ) : (
        <>
          <div className="modal-header">
            <img src={arrow_back} alt="뒤로가기" onClick={onOpenUserModal} />
            <p className="modal-title">비밀번호 변경</p>
          </div>
          <div className="input-wrap">
            <label htmlFor="email" className="modal-input-label">
              현재 비밀번호
            </label>
            <input
              type="text"
              placeholder="현재 비밀번호를 입력해주세요"
              className={
                currentPWError ? "modal-input modal-input-error" : "modal-input"
              }
              onChange={(e) => setCurrentPWInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {currentPWError && <p className="modal-error">{currentPWError}</p>}
          </div>
          <button
            className={
              nextActive
                ? `pwd-rst-button modal-email-btn-enable ${
                    nextBtnShake ? "shake" : ""
                  }`
                : `pwd-rst-button modal-email-btn-disable ${
                    nextBtnShake ? "shake" : ""
                  }`
            }
            onClick={handleNextClick}
          >
            다음
          </button>
        </>
      )}
    </Modal>
  );
};

export default PasswordChangeModal;
