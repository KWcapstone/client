import "@/views/splash/style/agree-modal.sass";
import Modal from "@/views/components/modal";

import { useState } from "react";

interface AgreeModalProps {
  onCloseModal: () => void;
  onOpenSignup: () => void;
}

const AgreeModal = ({ onCloseModal, onOpenSignup }: AgreeModalProps) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="agree-modal">
        <div className="agree-modal-header">
          <h2>이용약관 동의</h2>
        </div>
      </div>
    </Modal>
  );
};

export default AgreeModal;
