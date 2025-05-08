import "@/views/splash/style/agree-modal.sass";
import Modal from "@/views/components/modal";

import { useState, useEffect } from "react";

import arrow_back from "@/assets/imgs/icon/arrow_back_outlined.svg";
import arrow_right from "@/assets/imgs/icon/arrow_right.svg";

import { UserData } from "@/types/userData";
import { postSignUp } from "@/api/splash/signup";

interface AgreeModalProps {
  onCloseModal: () => void;
  onOpenSignup: () => void;
  onOpenLogin: () => void;
}

const AgreeModal = ({
  onCloseModal,
  onOpenSignup,
  onOpenLogin,
}: AgreeModalProps) => {
  const [active, setActive] = useState(false);
  const [allAgree, setAllAgree] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

  const [agreeError, setAgreeError] = useState("");

  const [agreeBtnShake, setAgreeBtnShake] = useState(false);

  useEffect(() => {
    setActive(agree1 && agree2 && agree3);
  }, [agree1, agree2, agree3]);

  useEffect(() => {
    setAgreeError("");
  }, [allAgree, agree1, agree2, agree3]);

  // 가입하기 버튼 애니메이션
  const triggerShake = () => {
    setAgreeBtnShake(true);
    setTimeout(() => setAgreeBtnShake(false), 500);
  };

  const handleAgreeClick = () => {
    let hasError = false;
    if (!agree1 || !agree2 || !agree3) {
      setAgreeError("모두 동의해주세요.");
      hasError = true;
    }
    if (hasError) {
      triggerShake();
      return;
    }
    // 가입하기 버튼 클릭 시 동작
    console.log("가입하기 버튼 클릭");

    const userData: UserData = {
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      password: localStorage.getItem("password") || "",
      agreement: true,
    };

    postSignUp(userData)
      .then((response) => {
        console.log("가입 성공", response);
        // 가입 성공 후 처리
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        onOpenLogin();
      })
      .catch((error) => {
        console.error("가입 실패", error);
        // 가입 실패 처리
      });
  };

  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="modal-header">
        <img src={arrow_back} alt="뒤로가기" onClick={onOpenSignup} />
        <p className="modal-title">이용악관 동의</p>
      </div>
      <div className="modal-all-agree">
        <input
          type="checkbox"
          className="modal-all-agree-checkbox"
          id="modal-all-agree-checkbox"
          checked={agree1 && agree2 && agree3}
          onChange={() => {
            setAllAgree(!allAgree);
            allAgree && agree1 ? setAgree1(false) : setAgree1(true);
            allAgree && agree1 ? setAgree2(false) : setAgree2(true);
            allAgree && agree1 ? setAgree3(false) : setAgree3(true);
            setAgreeError("");
          }}
        />
        <label htmlFor="modal-all-agree-checkbox" className="checkbox-label" />
        <p>모두 동의합니다.</p>
      </div>
      <div className="modal-agree-list">
        <div className="modal-agree-item">
          <div className="modal-agree-item-title">
            <input
              type="checkbox"
              className="modal-agree-checkbox"
              id="modal-agree-checkbox-1"
              onChange={() => {
                setAgree1(!agree1);
                setAgreeError("");
              }}
              checked={agree1}
            />
            <label
              htmlFor="modal-agree-checkbox-1"
              className="modal-agree-checkbox-label"
            />
            <p className="modal-agree-sub">(필수) 만 14세 이상입니다</p>
          </div>
          <img src={arrow_right} alt="화살표" />
        </div>
        <div className="modal-agree-item">
          <div className="modal-agree-item-title">
            <input
              type="checkbox"
              className="modal-agree-checkbox"
              id="modal-agree-checkbox-2"
              checked={agree2}
              onChange={() => {
                setAgree2(!agree2);
                setAgreeError("");
              }}
            />
            <label
              htmlFor="modal-agree-checkbox-2"
              className="modal-agree-checkbox-label"
            />
            <p className="modal-agree-sub">(필수) 모아바 이용약관 동의</p>
          </div>
          <img src={arrow_right} alt="화살표" />
        </div>
        <div className="modal-agree-item">
          <div className="modal-agree-item-title">
            <input
              type="checkbox"
              className="modal-agree-checkbox"
              id="modal-agree-checkbox-3"
              checked={agree3}
              onChange={() => {
                setAgree3(!agree3);
                setAgreeError("");
              }}
            />
            <label
              htmlFor="modal-agree-checkbox-3"
              className="modal-agree-checkbox-label"
            />
            <p className="modal-agree-sub">(필수) 개인정보 이용약관 동의</p>
          </div>
          <img src={arrow_right} alt="화살표" />
        </div>
      </div>
      {agreeError && <p className="modal-error">{agreeError}</p>}
      <button
        className={
          active
            ? "modal-agree-button"
            : `modal-agree-button modal-agree-button-disable 
            ${agreeBtnShake ? "shake" : ""}`
        }
        onClick={handleAgreeClick}
      >
        가입하기
      </button>
    </Modal>
  );
};

export default AgreeModal;
