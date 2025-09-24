import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useRef, useCallback, useEffect } from "react";

const pickMimeType = () => {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4", // Safari 계열
    "audio/ogg;codecs=opus",
    "audio/ogg",
  ];
  for (const t of candidates) {
    if ((window as any).MediaRecorder?.isTypeSupported?.(t)) return t;
  }
  return ""; // 브라우저가 알아서 고름
};

const UseSpeechToText = () => {
  const { transcript, listening, finalTranscript, resetTranscript } =
    useSpeechRecognition();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const start = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const mimeType = pickMimeType();
    const mr = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

    chunksRef.current = [];
    mr.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
    };
    mr.onstop = () => {
      const type = mr.mimeType || "audio/webm";
      const blob = new Blob(chunksRef.current, { type });
      setAudioBlob(blob);
      chunksRef.current = [];

      // 🔒 트랙 정리는 onstop 이후에
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      mediaRecorderRef.current = null;
    };

    mediaRecorderRef.current = mr;
    mr.start(); // timeslice 없이: stop 시점에 한번에 수집
    SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
    setIsRecording(true);
    setIsPaused(false);
  }, []);

  const toggleListening = async (onStopCallback?: (blob: Blob) => void) => {
    if (isRecording) {
      setIsRecording(false);
      // ✅ 반드시 mediaRecorder.stop() 먼저 호출 (onstop 유도)
      const mr = mediaRecorderRef.current;
      if (mr && mr.state !== "inactive") {
        mr.addEventListener(
          "stop",
          () => {
            if (onStopCallback && audioBlob) onStopCallback(audioBlob);
          },
          { once: true }
        );
        mr.stop();
      }

      // 음성 인식도 정지
      SpeechRecognition.stopListening();

      // abort는 예외 시에만 사용 권장. 여기선 불필요.
      // SpeechRecognition.abortListening();

      setIsPaused(false);
    } else {
      await start();
    }
  };

  const stopAndGetBlob = (): Promise<Blob> =>
    new Promise<Blob>((resolve, reject) => {
      try {
        const mr = mediaRecorderRef.current;

        console.log("[stopAndGetBlob] mr:", mr, "state:", mr?.state);
        console.log(
          "[stopAndGetBlob] chunks:",
          chunksRef.current.length,
          "audioBlob:",
          audioBlob?.size
        );

        if (!mr) return reject(new Error("MediaRecorder not initialized"));
        if (mr.state === "inactive") {
          // 이미 멈춰있으면, 마지막 state에 남은 blob이 있으면 사용
          return audioBlob && audioBlob.size
            ? resolve(audioBlob)
            : reject(new Error("Recorder inactive and no buffered audio"));
        }

        // 종료 직전 남은 버퍼를 강제로 밀어내기 (일부 브라우저에서 안전)
        try {
          mr.requestData?.();
        } catch {}

        const localChunks: BlobPart[] = [];
        const onData = (e: BlobEvent) => {
          if (e.data && e.data.size > 0) localChunks.push(e.data);
        };
        const onStop = () => {
          mr.removeEventListener("dataavailable", onData as any);
          mr.removeEventListener("stop", onStop as any);
          const type = mr.mimeType || "audio/webm";
          const blob = new Blob(
            localChunks.length ? localChunks : chunksRef.current,
            { type }
          );
          // 상태에도 반영해두면 좋음 (선택)
          setAudioBlob(blob);
          // 스트림 정리
          streamRef.current?.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
          mediaRecorderRef.current = null;
          resolve(blob);
        };

        mr.addEventListener("dataavailable", onData as any);
        mr.addEventListener("stop", onStop as any);

        // 실제 정지 트리거
        mr.stop();
        SpeechRecognition.stopListening();
        // abortListening()는 보통 필요 없음. (강제 중단 시만)
        // setRecording/setPaused 갱신은 onstop 이후나 여기서 해도 무방
        // setIsRecording(false); setIsPaused(false);
      } catch (e) {
        reject(e as any);
      }
    });
  const pauseRecording = () => {
    const mr = mediaRecorderRef.current;
    if (mr && isRecording && !isPaused && mr.state === "recording") {
      mr.pause();
      SpeechRecognition.stopListening();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    const mr = mediaRecorderRef.current;
    if (mr && isRecording && isPaused && mr.state === "paused") {
      mr.resume();
      SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
      setIsPaused(false);
    }
  };

  useEffect(() => {
    return () => {
      // 언마운트 안전 정리
      try {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state !== "inactive"
        ) {
          mediaRecorderRef.current.stop();
        }
      } catch {}
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return {
    transcript,
    listening,
    finalTranscript,
    resetTranscript,

    isRecording,
    isPaused,

    audioUrl,
    audioBlob,

    toggleListening,
    pauseRecording,
    resumeRecording,

    // 👇 컴포넌트에서 확실히 Blob을 받고 싶을 때 사용
    stopAndGetBlob,
  };
};

export default UseSpeechToText;
