import React from "react";
import { useNavigate } from "react-router-dom";

const Quiz = ({ onStart }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (onStart) onStart();
    navigate("/quizzes/holland-test");
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="shadow p-4 text-center"
        style={{ maxWidth: "500px", borderRadius: "12px" }}
      >
        <h5 className="fw-bold text-uppercase text-warning mb-3">
          Trắc nghiệm tính cách Holland miễn phí
        </h5>

        <div className="mb-3">
          <span className="fw-bold">Số câu:</span> 18 câu
          <span className="ms-4 fw-bold">Thời gian làm bài:</span> 18 phút
        </div>

        <div className="mb-4">
          <span className="fw-bold">Phạm vi kiểm tra:</span> Trắc nghiệm tính cách HOLLAND
        </div>

        <button
          className="btn btn-warning fw-bold px-4 py-2 text-white"
          onClick={handleStart}
        >
          Bắt đầu làm bài
        </button>
      </div>
    </div>
  );
};

export default Quiz;
