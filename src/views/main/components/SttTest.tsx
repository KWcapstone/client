// component
import UseSpeechToText from "@/views/main/components/useSpeechToText";

import { useEffect } from "react";

const ProjectPage = () => {
  const { transcript, listening, toggleListening } = UseSpeechToText();

  // ✅ transcript 값이 변경될 때 로그 확인
  useEffect(() => {
    console.log("현재 인식된 텍스트:", transcript);
  }, [transcript]);

  return (
    <>
      {/* ✅ transcript가 화면에 정상적으로 표시됨 */}
      <textarea className="transcript" value={transcript} readOnly />
      <button onClick={toggleListening}>
        {listening ? "음성인식 중지" : "음성인식 시작"}
      </button>
    </>
  );
};

export default ProjectPage;
