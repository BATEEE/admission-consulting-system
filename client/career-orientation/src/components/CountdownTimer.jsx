import React, { useState, useEffect } from "react";

const CountdownTimer = ({ minutes, onTimeout }) => {
    const [timeLeft, setTimeLeft] = useState(minutes * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer); 
                    if (onTimeout) onTimeout();
                    return 0; 
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);

    }, [onTimeout]); 

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

export default React.memo(CountdownTimer);