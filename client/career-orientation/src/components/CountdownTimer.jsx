import React, { useState, useEffect } from "react";

const CountDownTimer = ({ minutes, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeout) onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <span className="fw-semibold">Thời gian còn lại</span>
      <span className="fw-bold text-danger fs-5">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default CountDownTimer;
