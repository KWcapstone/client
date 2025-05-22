// // // component
// import UseSpeechToText from "@/views/meeting/components/UseSpeechToText";

// // import { useEffect } from "react";

// // const ProjectPage = () => {
// //   const { transcript, listening, toggleListening } = UseSpeechToText();

// //   // ✅ transcript 값이 변경될 때 로그 확인
// //   useEffect(() => {
// //     console.log("현재 인식된 텍스트:", transcript);
// //   }, [transcript]);

// //   return (
// //     <>
// //       {/* ✅ transcript가 화면에 정상적으로 표시됨 */}
// //       <textarea className="transcript" value={transcript} readOnly />
// //       <button onClick={toggleListening}>
// //         {listening ? "음성인식 중지" : "음성인식 시작"}
// //       </button>
// //     </>
// //   );
// // };

// // export default ProjectPage;

// const MyVoiceComponent = () => {
//   const {
//     transcript,
//     isRecording,
//     isPaused,
//     toggleListening,
//     pauseRecording,
//     resumeRecording,
//     audioUrl,
//   } = UseSpeechToText();

//   return (
//     <div>
//       <button onClick={toggleListening}>{isRecording ? "정지" : "시작"}</button>
//       {isRecording && !isPaused && (
//         <button onClick={pauseRecording}>⏸️ 일시정지</button>
//       )}
//       {isRecording && isPaused && (
//         <button onClick={resumeRecording}>▶️ 재개</button>
//       )}

//       <p>인식된 텍스트: {transcript}</p>

//       {audioUrl && (
//         <>
//           <p>✅ 녹음 완료됨</p>
//           <audio src={audioUrl} controls />
//         </>
//       )}
//     </div>
//   );
// };

// export default MyVoiceComponent;
