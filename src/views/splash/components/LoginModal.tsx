import "@/views/splash/style/login-modal.sass";

interface LoginModalProps {
  onCloseModal: () => void;
}

const LoginModal = ({ onCloseModal }: LoginModalProps) => {
  return (
    <div className={"modal-content"}>
      <p>리액트로 모달 구현하기</p>
      <button className={"modal-close-btn"} onClick={onCloseModal}>
        모달 닫기
      </button>
    </div>
  );
};

export default LoginModal;
