import { ReactFlow } from "@xyflow/react";

// style
import "@xyflow/react/dist/style.css";
import "@/views/meeting/style/mind-map.sass";

// component
import UseSpeechToText from "@/views/meeting/components/UseSpeechToText";
import useRecordingTimer from "@/views/meeting/components/RecodingTimer";

// import
import { useEffect, useState } from "react";

interface scriptData {
  time: string;
  script: string;
}

interface MindMapComponentProps {
  setScripts: React.Dispatch<React.SetStateAction<scriptData[]>>;
}

const MindMapComponent = ({ setScripts }: MindMapComponentProps) => {
  const {
    // transcript,
    isRecording,
    isPaused,
    toggleListening,
    pauseRecording,
    resumeRecording,
    finalTranscript,
    resetTranscript,
    // audioUrl,
  } = UseSpeechToText();
  const { formattedTime } = useRecordingTimer(isRecording, isPaused);

  useEffect(() => {
    if (finalTranscript !== "") {
      console.log("🎙️ 시간", formattedTime);
      console.log("🎙️ 인식된 텍스트:", finalTranscript);
      setScripts((prev) => [
        ...prev,
        {
          time: formattedTime,
          script: finalTranscript,
        },
      ]);
    }

    // 여기서 백엔드한테 보내기
    resetTranscript();
  }, [finalTranscript]);

  const stopClick = () => {
    toggleListening();
  };

  const [mode, setMode] = useState<string>("none");

  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "2" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  ];

  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

  return (
    <div className="mind-map-container">
      {mode === "none" ? (
        <div className="start-wrap">
          <p>
            녹음을 시작하고 자동으로 생성되는
            <br />
            마인드맵을 확인해보세요.
          </p>
          <button
            className="btn-mic"
            onClick={() => (toggleListening(), setMode("meeting"))}
          >
            녹음 시작하기
          </button>
        </div>
      ) : (
        <div className="mind-map-main">
          <div className="mind-map-wrap">
            <ReactFlow nodes={initialNodes} edges={initialEdges} />
          </div>
          <div className="middle-bar">
            <div className="record-length-wrap">
              <div className="box-wrap">
                <div className="red box"></div>
                {Array.from({ length: 9 }).map(() => (
                  <div className="box"></div>
                ))}
              </div>
              <div className="box-time">{formattedTime}</div>
              {isRecording && (
                <div className="box-menu">
                  {isRecording && !isPaused && (
                    <button
                      className="btn-pause"
                      onClick={pauseRecording}
                    ></button>
                  )}
                  {isRecording && isPaused && (
                    <button className="btn-resume" onClick={resumeRecording}>
                      재개
                    </button>
                  )}
                  <button className="btn-stop" onClick={stopClick}></button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMapComponent;
