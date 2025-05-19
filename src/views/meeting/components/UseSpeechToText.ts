import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useRef } from "react";

const UseSpeechToText = () => {
  const { transcript, listening, finalTranscript, resetTranscript } =
    useSpeechRecognition();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // ✅ 일시정지 상태
  const audioChunks = useRef<Blob[]>([]);

  const toggleListening = async () => {
    if (isRecording) {
      // 정지
      SpeechRecognition.stopListening();
      SpeechRecognition.abortListening();

      mediaRecorderRef.current?.stream?.getTracks().forEach((track) => {
        track.stop();
      });

      setIsRecording(false);
    } else {
      // 시작
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });

        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");

        // await fetch("https://your-backend/upload", {
        //   method: "POST",
        //   body: formData,
        // });

        // const url = URL.createObjectURL(audioBlob);
        // setAudioUrl(url);
      };

      mediaRecorder.start();
      SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
      setIsRecording(true);
      setIsPaused(false); // 시작 시 초기화
    }
  };

  const pauseRecording = () => {
    if (isRecording && !isPaused) {
      mediaRecorderRef.current?.pause(); // MediaRecorder 일시정지
      SpeechRecognition.stopListening(); // 음성인식 멈춤
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (isRecording && isPaused) {
      mediaRecorderRef.current?.resume(); // 녹음 재개
      SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
      setIsPaused(false);
    }
  };

  return {
    transcript,
    listening,
    isRecording,
    isPaused,
    audioUrl,
    toggleListening,
    pauseRecording,
    resumeRecording,
    finalTranscript,
    resetTranscript,
  };
};

export default UseSpeechToText;
