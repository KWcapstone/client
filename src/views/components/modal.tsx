import "@/views/components/style/modal.sass";
import modal_close from "@/assets/imgs/icon/modal_close.svg";

interface LoginModalProps {
  onCloseModal: () => void;
  children: React.ReactNode; // 안에 들어갈 내용
}

const Modal = ({ onCloseModal, children }: LoginModalProps) => {
  return (
    <div className="modal-content">
      <div onClick={onCloseModal} className="modal-close-btn">
        <img src={modal_close} alt="닫기" />
      </div>
      {children}
    </div>
  );
};

export default Modal;
