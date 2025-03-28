import "@/views/splash/style/signup-modal.sass";
import Modal from "@/views/components/modal";

interface LoginModalProps {
  onCloseModal: () => void;
}

const SignupModal = ({ onCloseModal }: LoginModalProps) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <p className="modal-title">회원가입</p>
    </Modal>
  );
};

export default SignupModal;
