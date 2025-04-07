import Navbar from "@/views/splash/components/Navbar";

import "@/views/splash/style/splash.sass";
import "@/views/components/style/modal.sass";

import { useState, useRef } from "react";
import { Link } from "react-router-dom"
import LoginModal from "@/views/splash/components/LoginModal";
import SignupModal from "@/views/splash/components/SignupModal";
import AgreeModal from "@/views/splash/components/AgreeModal";
import PasswordResetModal from "@/views/splash/components/PasswordResetModal";

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

  return (
    <>
      <Navbar onOpenModal={openModal} />
      <div className="splash-wrap" ref={modalBackground}>
        <h1>Splash Page</h1>
        <Link to="/project">Project page</Link>
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
      </div>
    </>
  );
};

export default SplashPage;
