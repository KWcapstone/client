// style
import "@/views/main/style/dwn-modal.sass";

// components
import Modal from "@/views/components/modal";

// libraries
import { useEffect, useMemo, useState } from "react";

type FileKind = "mindmap" | "record" | "summary";
type FileFormat = "jpg" | "png" | "zip" | "txt";

interface DwnModalProps {
  onCloseModal: () => void;
  onSubmit?: (payload: {
    kind: FileKind;
    format: FileFormat;
  }) => void | Promise<void>;
}

const KIND_FORMAT_OPTIONS: Record<
  FileKind,
  { value: FileFormat; label: string }[]
> = {
  mindmap: [
    { value: "jpg", label: "JPG 이미지(.jpg)" },
    { value: "png", label: "PNG 이미지(.png)" },
  ],
  record: [{ value: "zip", label: "ZIP(.zip)" }],
  summary: [{ value: "txt", label: "텍스트(.txt)" }],
};

export default function DwnModal({ onCloseModal, onSubmit }: DwnModalProps) {
  const [kind, setKind] = useState<FileKind | "">("");
  const [format, setFormat] = useState<FileFormat>("jpg");

  const canSubmit = !!kind;

  // 현재 kind에 따른 형식 옵션
  const formatOptions = useMemo(() => {
    return kind ? KIND_FORMAT_OPTIONS[kind as FileKind] : [];
  }, [kind]);

  // kind 바뀌면 해당 kind의 첫 옵션으로 format 동기화
  useEffect(() => {
    if (!kind) return;
    const first = KIND_FORMAT_OPTIONS[kind as FileKind][0]?.value;
    if (first && format !== first) setFormat(first);
  }, [kind]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    await onSubmit?.({ kind: kind as FileKind, format });
    onCloseModal();
  };

  return (
    <Modal onCloseModal={onCloseModal}>
      <p className="modal-title">다운로드</p>

      <form className="modal-wrap" onSubmit={handleSubmit}>
        {/* 파일 종류 선택 */}
        <div className="file-wrap">
          <h3>파일 선택</h3>
          <div className="radio-container">
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
              disabled={!kind} // 종류 선택 전엔 비활성화
            >
              {!kind && <option value="">다운로드 파일을 선택하세요</option>}
              {formatOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={!canSubmit}>
          다운로드
        </button>
      </form>
    </Modal>
  );
}
