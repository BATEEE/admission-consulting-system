import React from "react";
import CountdownTimer from "./CountdownTimer";

const SummaryPanel = ({
  questions,
  selectedAnswers,
  currentQuestion,
  handleJumpQuestion,
  handleSubmit,
  onTimeout,
}) => {
  return (
    <div className="summary-section border rounded p-3 bg-white shadow-sm ms-4">
      {/* Header thống kê */}
      <div className="d-flex justify-content-between border-bottom border-secondary-subtle pb-2 mb-3">
        <div className="d-flex flex-column align-items-center px-3 flex-fill border-end border-secondary-subtle">
          <span className="fw-semibold">Số câu đã làm </span>
          <span className="fw-bold text-dark">
            {Object.keys(selectedAnswers).length}/{questions.length}
          </span>
        </div>

        <div className="flex-fill">
          <CountdownTimer minutes={30} onTimeout={onTimeout} />
        </div>
      </div>

      {/* Lưới câu hỏi */}
      <div className="summary-grid mb-3">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className={`summary-box ${
              selectedAnswers[q.id] ? "answered" : "unanswered"
            } ${index === currentQuestion ? "current" : ""}`}
            onClick={() => handleJumpQuestion(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Nút nộp bài */}
      <button
        className="btn btn-warning text-white fw-bold w-100 rounded-pill"
        onClick={handleSubmit}
        disabled={Object.keys(selectedAnswers).length < questions.length}
      >
        NỘP BÀI
      </button>
    </div>
  );
};

export default SummaryPanel;
