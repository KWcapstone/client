import "@/views/splash/style/password-reset-modal.sass";
import Modal from "@/views/components/modal";
import { useState, useEffect } from "react";
import arrow_back from "@/assets/imgs/icon/arrow_back_outlined.svg";

interface PasswordResetModalProps {
  onCloseModal: () => void;
  onOpenLogin: () => void;
}

const PasswordResetModal = ({
  onCloseModal,
  onOpenLogin,
}: PasswordResetModalProps) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="modal-header">
        <img src={arrow_back} alt="" onClick={onCloseModal} />
      </div>
    </Modal>
  );
};

export default PasswordResetModal;
