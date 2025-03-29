import "@/views/splash/style/agree-modal.sass";
import Modal from "@/views/components/modal";

import { useState, useEffect } from "react";

import arrow_back from "@/assets/imgs/icon/arrow_back_outlined.svg";
import arrow_right from "@/assets/imgs/icon/arrow_right.svg";

interface AgreeModalProps {
  onCloseModal: () => void;
  onOpenSignup: () => void;
}

const AgreeModal = ({ onCloseModal, onOpenSignup }: AgreeModalProps) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="modal-header">
        <img src={arrow_back} alt="뒤로가기" onClick={onOpenSignup} />
        <p className="modal-title">이용악관 동의</p>
      </div>
      <label className="modal-all-agree">
        <input type="checkbox" className="modal-all-agree-checkbox" />
        <p>모두 동의합니다.</p>
      </label>
      <div className="modal-agree-list">
        <div className="modal-agree-item">
          <div className="modal-agree-item-title">
            <input type="checkbox" className="modal-agree-checkbox" />
            <p className="modal-agree-sub">(필수) 만 14세 이상입니다</p>
          </div>
          <img src={arrow_right} alt="화살표" />
        </div>
        <div className="modal-agree-item">
          <div className="modal-agree-item-title">
            <input type="checkbox" className="modal-agree-checkbox" />
            <p className="modal-agree-sub">(필수) 모아바 이용약관 동의</p>
          </div>
          <img src={arrow_right} alt="화살표" />
        </div>
        <div className="modal-agree-item">
          <div className="modal-agree-item-title">
            <input type="checkbox" className="modal-agree-checkbox" />
            <p className="modal-agree-sub">(필수) 개인정보 이용약관 동의</p>
          </div>
          <img src={arrow_right} alt="화살표" />
        </div>
      </div>
      <button className="modal-agree-button">가입하기</button>
    </Modal>
  );
};

export default AgreeModal;
