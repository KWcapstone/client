import "@/views/components/style/share-modal.sass";
import Modal from "@/views/components/modal";
import linkImg from "@/assets/imgs/icon/line-md_link.svg";
import user from "@/assets/imgs/common/user.svg";

interface ShareModalProps {
  onCloseModal: () => void;
}

const ShareModal = ({ onCloseModal }: ShareModalProps) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <p className="modal-title">공유하기</p>
      <div className="share-modal-wrap">
        <div className="email">
          <span className="email-title">이메일 초대</span>
          <div className="email-input-wrap">
            <input
              type="text"
              className="email-input"
              placeholder="이메일을 입력해주세요"
            />
            <button className="email-btn cursor-pointer">초대하기</button>
          </div>
        </div>
        <div className="link">
          <span className="link-title">초대 링크</span>
          <div className="link-copy-wrap">
            <div className="link-copy">moaba.com/cjy-zvq-qqux</div>
            <div className="link-copy-btn-wrap cursor-pointer">
              <img
                src={linkImg}
                className="link-copy-btn-icon"
                alt="링크이미지"
              />
              <div className="link-copy-btn-text">복사하기</div>
            </div>
          </div>
        </div>
        <div className="member">
          <span className="member-title">공유된 멤버</span>
          <div className="member-list">
            <div className="member-item">
              <div className="member-info-wrap">
                <img src={user} alt="user" className="member-img" />
                <span className="member-name">이름</span>
              </div>
              <div className="member-role">회의 생성자</div>
            </div>
            <div className="member-item">
              <div className="member-info-wrap">
                <img src={user} alt="user" className="member-img" />
                <span className="member-name">이름</span>
              </div>
              <div className="member-role">참석자</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
