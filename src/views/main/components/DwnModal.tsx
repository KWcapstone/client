import "@/views/main/style/dwn-modal.sass";
import Modal from "@/views/components/modal";

interface DwnModalProps {
  onCloseModal: () => void;
}

const DwnModal = ({
  onCloseModal,
}: DwnModalProps) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <p className="modal-title">다운로드</p>
      <div className="modal-wrap">
        <div className="file-wrap">
          <h3>파일 선택</h3>
          <div className="radio-container">
            <div className="radio-wrap mind-map">
              <div className="img"></div>
              <input type="radio" name="file" id="mind-map" value="1"/>
              <div className="radio-title">마인드맵</div>
            </div>
            <div className="radio-wrap record">
              <div className="img"></div>
              <input type="radio" name="file" id="record" value="2"/>
              <div className="radio-title">음성・스크립트</div>
            </div>
            <div className="radio-wrap summary">
              <div className="img"></div>
              <input type="radio" name="file" id="summary" value="3"/>
              <div className="radio-title">요약본</div>
            </div>
          </div>
        </div>
        <div className="type-wrap">
          <h3>형식 선택</h3>
          <div className="select-wrap">
            <select>
              <option>JPG 이미지(.jpg)</option>
              <option>PNG 이미지(.png)</option>
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DwnModal;
