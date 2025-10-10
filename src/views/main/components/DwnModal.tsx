// style
import "@/views/main/style/dwn-modal.sass";
import Modal from "@/views/components/modal";
import { useState } from "react";

type FileKind = "mindmap" | "record" | "summary";
type FileFormat = "jpg" | "png";

interface DwnModalProps {
  onCloseModal: () => void;
  // 선택 결과를 부모로 전달해 실제 다운로드/요청을 처리
  onSubmit?: (payload: {
    kind: FileKind;
    format: FileFormat;
  }) => void | Promise<void>;
}

const DwnModal = ({ onCloseModal, onSubmit }: DwnModalProps) => {
  const [kind, setKind] = useState<FileKind | "">("");
  const [format, setFormat] = useState<FileFormat>("jpg");
  const canSubmit = !!kind;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    await onSubmit?.({ kind: kind as FileKind, format });
    onCloseModal(); // 성공 시 닫기 (원하면 제거)
  };

  return (
    <Modal onCloseModal={onCloseModal}>
      <p className="modal-title">다운로드</p>

      <form className="modal-wrap" onSubmit={handleSubmit}>
        {/* 파일 종류 선택 */}
        <div className="file-wrap">
          <h3>파일 선택</h3>
          <div className="radio-container">
            {/* 라벨로 감싸 클릭 범위 확장 + 접근성 향상 */}
            <label
              className={`radio-wrap mind-map ${
                kind === "mindmap" ? "active" : ""
              }`}
              htmlFor="mind-map"
            >
              <div className="img" />
              <input
                type="radio"
                name="file"
                id="mind-map"
                value="mindmap"
                checked={kind === "mindmap"}
                onChange={() => setKind("mindmap")}
                required
              />
              <div className="radio-title">마인드맵</div>
            </label>

            <label
              className={`radio-wrap record ${
                kind === "record" ? "active" : ""
              }`}
              htmlFor="record"
            >
              <div className="img" />
              <input
                type="radio"
                name="file"
                id="record"
                value="record"
                checked={kind === "record"}
                onChange={() => setKind("record")}
                required
              />
              <div className="radio-title">음성・스크립트</div>
            </label>

            <label
              className={`radio-wrap summary ${
                kind === "summary" ? "active" : ""
              }`}
              htmlFor="summary"
            >
              <div className="img" />
              <input
                type="radio"
                name="file"
                id="summary"
                value="summary"
                checked={kind === "summary"}
                onChange={() => setKind("summary")}
                required
              />
              <div className="radio-title">요약본</div>
            </label>
          </div>
        </div>

        {/* 형식 선택 */}
        <div className="type-wrap">
          <h3>형식 선택</h3>
          <div className="select-wrap">
            <select
              aria-label="파일 형식"
              value={format}
              onChange={(e) => setFormat(e.target.value as FileFormat)}
            >
              <option value="jpg">JPG 이미지(.jpg)</option>
              <option value="png">PNG 이미지(.png)</option>
            </select>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="actions">
          <button type="button" className="btn-cancel" onClick={onCloseModal}>
            취소
          </button>
          <button type="submit" className="btn-primary" disabled={!canSubmit}>
            다운로드
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DwnModal;
