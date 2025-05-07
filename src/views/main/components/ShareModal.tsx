import "@/views/main/style/user-modal.sass";
import Modal from "@/views/components/modal";

interface ShareModalProps {
  onCloseModal: () => void;
}

const ShareModal = ({
  onCloseModal,
}: ShareModalProps) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <p className="modal-title">공유하기</p>
      <div className="modal-wrap">
        <div className="file-wrap">
          <h3>파일 선택</h3>
          <div className="file-wrap">
            <div className="mind-map-wrap">
              <div className="img-wrap"></div>
              <p>마인드맵</p>
            </div>
            <div className="recoed-wrap">
              <div className="img-wrap"></div>
              <p>요약본</p>
            </div>
            <div className="summary-wrap">
              <div className="img-wrap"></div>
              <p>음성・스크립트</p>
            </div>
          </div>
        </div>
        <div className="type-wrap">
          <select>
            <option>JPG 이미지(.jpg)</option>
            <option>PNG 이미지(.png)</option>
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
