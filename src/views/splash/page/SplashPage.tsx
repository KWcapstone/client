import Navbar from "@/views/splash/components/Navbar";

import "@/views/splash/style/splash.sass";
import "@/views/components/style/modal.sass";

import { useState, useRef } from "react";

import LoginModal from "@/views/splash/components/LoginModal";
import SignupModal from "@/views/splash/components/SignupModal";

const SplashPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);
  const modalBackground = useRef<HTMLDivElement>(null);

  const openLoginModal = () => setModalType("login");
  const openSignupModal = () => setModalType("signup");

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };
  const openModal = () => {
    setModalOpen(true);
    setModalType("login");
  };

  return (
    <>
      <Navbar onOpenModal={openModal} />
      <div className="splash-wrap" ref={modalBackground}>
        <h1>Splash Page</h1>

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
              onOpenSignup={openSignupModal} // 👈 이걸 props로 넘김
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
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SplashPage;
