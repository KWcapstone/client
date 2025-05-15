import { ReactFlow } from '@xyflow/react';

// component
import UseSpeechToText from "@/views/meeting/components/UseSpeechToText";

import '@xyflow/react/dist/style.css';
import "@/views/meeting/style/mind-map.sass";

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

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '2' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' }
  ];
   
  return (
    <div className="mind-map-container">
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
          <div>
            <button onClick={toggleListening}>{isRecording ? "정지" : "시작"}</button>
            {isRecording && !isPaused && (
              <button onClick={pauseRecording}>⏸️ 일시정지</button>
            )}
            {isRecording && isPaused && (
              <button onClick={resumeRecording}>▶️ 재개</button>
            )}

            <p>인식된 텍스트: {transcript}</p>

            {audioUrl && (
              <>
                <p>✅ 녹음 완료됨</p>
                <audio src={audioUrl} controls />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MindMapComponent;