import Navbar from "@/views/splash/components/Navbar";

import "@/views/splash/style/splash.sass";
import "@/views/components/style/modal.sass";

import { useState, useEffect, useRef } from "react";

import LoginModal from "@/views/splash/components/LoginModal";
import SignupModal from "@/views/splash/components/SignupModal";
import AgreeModal from "@/views/splash/components/AgreeModal";
import PasswordResetModal from "@/views/splash/components/PasswordResetModal";
import { getTest } from "@/api/main/project";

import splashIcon from "@/assets/imgs/common/splashIcon.svg";
import mainImage from "@/assets/imgs/common/mainImage.svg";
import solarSystem from "@/assets/imgs/common/solarSystem.svg";

const SplashPage = () => {
  type ModalType = "login" | "signup" | "agree" | "resetPw" | null;
  const [modalType, setModalType] = useState<ModalType>(null);

  const modalBackground = useRef<HTMLDivElement>(null);

  const openLoginModal = () => setModalType("login");
  const openSignupModal = () => setModalType("signup");
  const openAgreeModal = () => setModalType("agree");
  const openResetPwModal = () => setModalType("resetPw");

  const closeModal = () => setModalType(null);

  const openModal = () => setModalType("login");

  useEffect(() => {
    getTest().then(() => {});
  }, []);

  return (
    <>
      <Navbar onOpenModal={openModal} />
      <div className="splash-wrap" ref={modalBackground}>
        {modalType === "login" && (
          <div
            className="modal-container"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <LoginModal
              onCloseModal={closeModal}
              onOpenSignup={openSignupModal}
              onOpenResetPw={openResetPwModal}
            />
          </div>
        )}
        {modalType === "signup" && (
          <div
            className="modal-container"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <SignupModal
              onCloseModal={closeModal}
              onOpenLogin={openLoginModal}
              onOpenAgree={openAgreeModal}
            />
          </div>
        )}
        {modalType === "agree" && (
          <div
            className="modal-container"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <AgreeModal
              onCloseModal={closeModal}
              onOpenSignup={openSignupModal}
              onOpenLogin={openLoginModal}
            />
          </div>
        )}
        {modalType === "resetPw" && (
          <div
            className="modal-container"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <PasswordResetModal
              onCloseModal={closeModal}
              onOpenLogin={openLoginModal}
            />
          </div>
        )}
        <div className="splash-container">
          <div className="hero-container">
            <div className="intro-container">
              <div className="intro-headline">
                음성에서 마인드맵까지,
                <br /> 아이디어를 더 스마트하게
              </div>
              <div className="intro-subheadline">
                아이디어는 자유롭게, 정리는 자동으로.
                <br /> 브레인스토밍이 가벼워지는 순간을 경험해보세요.
              </div>
              <div className="intro-btn">바로 무료 시작하기</div>
            </div>
            <div className="hero-logo">
              <img src={splashIcon} alt="logo" className="hero-logo-img" />
            </div>
          </div>
          <div className="main-image">
            <img src={mainImage} alt="main" className="main-image-img" />
          </div>
          <div className="spacial-container">
            <div className="spacial-headline">
              흩어진 아이디어를 한눈에 정리해요
            </div>
            <div className="spacial-subheadline">
              녹음을 통한 실시간 음성을 텍스트로 변환하고, 대화 키워드를
              <br /> 마인드맵으로 시각화하여 아이디어 정리를 돕습니다.
            </div>
            <div className="spacial-img">
              <img
                src={solarSystem}
                alt="solarSystem"
                className="spacial-img-img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
