import { useState, useEffect, useRef } from "react";

const useRecordingTimer = (isRecording: boolean, isPaused: boolean) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1); // 정확히 1초씩 증가
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRecording, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const timeStamp = (seconds: number) => {
    return formatTime(seconds);
  };

  return {
    elapsedTime,
    formattedTime: formatTime(elapsedTime),
    timeStamp,
  };
};

export default useRecordingTimer;
