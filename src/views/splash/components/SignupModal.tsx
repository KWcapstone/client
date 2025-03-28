import "@/views/splash/style/signup-modal.sass";
import Modal from "@/views/components/modal";

import arrow_back from "@/assets/imgs/icon/arrow_back_outlined.svg";

interface LoginModalProps {
  onCloseModal: () => void;
}

const SignupModal = ({ onCloseModal }: LoginModalProps) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="modal-header">
        <img src={arrow_back} alt="뒤로가기" />
        <p className="modal-title">회원가입</p>
      </div>
      <form>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          placeholder="이름을 입력해주세요"
          className="modal-input"
        />
        <label htmlFor="email">이메일</label>
        <div className="modal-email">
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            className="modal-input"
          />
          <button type="button" className="modal-code-btn">
            인증코드 받기
          </button>
        </div>
        <input
          type="text"
          id="code"
          placeholder="인증코드를 입력해주세요"
          className="modal-input"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          className="modal-input"
        />
        <p className="modal-pw-info">
          영문/숫자/특수문자 중 2가지 이상 조합, 8자~15자리
        </p>
        <button
          type="button"
          className="modal-signup-btn modal-login-btn-enable"
        >
          다음
        </button>
      </form>
      <div className="modal-already">
        <p>이미 계정이 있으신가요?</p>
        <span
          onClick={() => {
            onCloseModal();
          }}
        >
          로그인
        </span>
      </div>
    </Modal>
  );
};

export default SignupModal;
