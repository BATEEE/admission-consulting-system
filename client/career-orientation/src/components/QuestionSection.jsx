import React from "react";

const QuestionSection = ({
  currentQ,
  currentQuestion,
  total,
  currentAnswers,
  selectedAnswers,
  handleSelectAnswer,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="question-section p-5">
      <h2 className="fs-4 fw-bold">Câu {currentQuestion + 1}:</h2>
      <p className="mb-5 fw-semibold fs-5">{currentQ.content}</p>

      <div className="options">
        {currentAnswers.map((ans) => (
          <button
            key={ans.id}
            className={`option-btn fw-semibold ${
              selectedAnswers[currentQ.id]?.id === ans.id ? "selected" : ""
            }`}
            onClick={() => handleSelectAnswer(ans)}
          >
            {ans.content}
          </button>
        ))}
      </div>

      <div className="navigation mt-4">
        <button
          onClick={handlePrev}
          className="btn btn-primary fw-semibold"
          disabled={currentQuestion === 0}
        >
          Quay lại
        </button>
        <button
          onClick={handleNext}
          className="btn btn-primary fw-semibold"
          disabled={
            currentQuestion === total - 1 &&
            Object.keys(selectedAnswers).length < total
          }
        >
          {currentQuestion < total - 1 ? "Tiếp theo" : "Hoàn thành"}
        </button>
      </div>
    </div>
  );
};

export default QuestionSection;
