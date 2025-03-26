import "@/views/splash/style/login-modal.sass";
import modal_close from "@/assets/imgs/icon/modal_close.svg";
import kakao_login from "@/assets/imgs/common/kakao_login.svg";
import google_login from "@/assets/imgs/common/google_login.svg";
import naver_login from "@/assets/imgs/common/naver_login.svg";
interface LoginModalProps {
  onCloseModal: () => void;
}

const LoginModal = ({ onCloseModal }: LoginModalProps) => {
  return (
    <div className="modal-content">
      <div onClick={onCloseModal} className="modal-close-btn">
        <img src={modal_close}></img>
      </div>
      <p className="modal-title">로그인</p>
      <form>
        <label id="id">이메일</label>
        <input id="id" type="text" placeholder="이메일을 입력해주세요" />
        <label id="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <button className="modal-login-btn-disable">로그인</button>
      </form>
      <div className="modal-footer">
        <div className="modal-footer-text">비밀번호 재설정</div>
        <div className="modal-footer-text">회원가입</div>
      </div>
      <div className="modal-divider">
        <hr />
        SNS 계정으로 로그인
        <hr />
      </div>
      <div className="modal-sns-login">
        <img src={kakao_login} />
        <img src={google_login} />
        <img src={naver_login} />
      </div>
    </div>
  );
};

export default LoginModal;
