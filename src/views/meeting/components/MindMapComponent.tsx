import { ReactFlow } from '@xyflow/react';

// style
import '@xyflow/react/dist/style.css';
import "@/views/meeting/style/mind-map.sass";

// component
import UseSpeechToText from "@/views/meeting/components/UseSpeechToText";

// import
// import { useState, useEffect } from "react";


const MindMapComponent = () => {
  const {
    transcript,
    isRecording,
    isPaused,
    toggleListening,
    pauseRecording,
    resumeRecording,
    audioUrl,
  } = UseSpeechToText();

  // const [mode, setMode] = useState<string>("none");

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '2' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' }
  ];
   
  return (
    <div className="mind-map-container">
      {
        !isRecording ? (
          <div className='start-wrap'>
            <p>녹음을 시작하고 자동으로 생성되는<br/>마인드맵을 확인해보세요.</p>
            <button className='btn-mic' onClick={toggleListening}>녹음 시작하기</button>
          </div>
        ) : (
          <div className="mind-map-main">
            <div className='mind-map-wrap'>
              <ReactFlow nodes={initialNodes} edges={initialEdges} />
              <ReactFlow nodes={initialNodes} edges={initialEdges} />
            </div>
            <div className="middle-bar">
              <div className="record-length-wrap">
                <div className="box-wrap">
                  <div className='red box'></div>
                  {Array.from({ length: 9 }).map(() => (
                    <div className='box'></div>
                  ))}
                </div>
                <div className="box-time">
                  13:28
                </div>
                <div className="box-menu">
                  {isRecording && !isPaused && (
                    <button className='btn-pause' onClick={pauseRecording}>일시정지</button>
                  )}
                  {isRecording && isPaused && (
                    <button className='btn-resume' onClick={resumeRecording}>▶️ 재개</button>
                  )}
                  <button className='btn-record' onClick={toggleListening}>{isRecording ? "정지" : "시작"}</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default MindMapComponent;