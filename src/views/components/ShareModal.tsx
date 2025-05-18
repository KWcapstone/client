// style
import "@/views/components/style/share-modal.sass";

// components
import Modal from "@/views/components/modal";

// assets
import linkImg from "@/assets/imgs/icon/line-md_link.svg";
import user from "@/assets/imgs/common/user.svg";

// apis
import { openShereModal } from "@/api/common/shareProject";

//import
import { useEffect, useState } from "react";

// types
import { ShareModalData } from "@/types/shareModalData";

interface ShareModalProps {
  onCloseModal: () => void;
  projectId: string[];
}

const ShareModal = ({ onCloseModal, projectId }: ShareModalProps) => {
  const [modalData, setModalData] = useState<ShareModalData>();

  const getModalData = () => {
    openShereModal(projectId).then((res: any) => {
      setModalData(res.data.data);
    });
  };

  useEffect(() => {
    getModalData();
  }, []);

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
            <div className="link-copy">{modalData?.inviteUrl}</div>
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
            {modalData?.sharedMembers.map((member, index) => (
              <div className="member-item" key={index}>
                <div className="member-info-wrap">
                  <img src={user} alt="user" className="member-img" />
                  <span className="member-name">{member.nickname}</span>
                </div>
                <div className="member-role">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
