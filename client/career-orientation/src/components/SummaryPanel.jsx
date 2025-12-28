import React from "react";

const SummaryPanel = ({
    questions,
    selectedAnswers,
    currentQuestion,
    handleJumpQuestion,
    handleSubmit,
}) => {
    return (
        <div className="summary-section border rounded p-3 bg-white shadow-sm">
            <div className="d-flex justify-content-center border-bottom border-secondary-subtle pb-2 mb-3">
                <div className="d-flex flex-column align-items-center px-3 flex-fill">
                    <span className="fw-semibold">Đã làm</span>
                    <span className="fw-bold text-dark fs-5">
                        {Object.keys(selectedAnswers).length}/{questions.length}
                    </span>
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