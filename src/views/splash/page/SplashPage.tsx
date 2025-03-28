import Navbar from "@/views/splash/components/Navbar";
import "@/views/splash/style/splash.sass";
import "@/views/components/style/modal.sass";

import { useState, useRef } from "react";
import LoginModal from "@/views/splash/components/LoginModal";

const SplashPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <>
      <Navbar onOpenModal={openModal} />
      <div className="splash-wrap" ref={modalBackground}>
        <h1>Splash Page</h1>

        {modalOpen && (
          <div
            className="modal-container"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <LoginModal onCloseModal={closeModal} />
          </div>
        )}
      </div>
    </>
  );
};

export default SplashPage;
