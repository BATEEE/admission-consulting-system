import React, { useState, useEffect } from "react";
import Apis, { endpoints } from "../configs/Apis";
import "../styles/HollandTest.css";
import ResultHolland from "../components/ResultHolland";
import QuestionSection from "../components/QuestionSection";
import SummaryPanel from "../components/SummaryPanel";

const HollandTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answersData, setAnswersData] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const loadQuestions = async () => {
    try {
      const url = `${endpoints["questions-random"]}?total=6`;
      const res = await Apis.get(url);
      setQuestions(res.data);
      if (res.data.length > 0) loadAnswers(res.data[0].id);
    } catch (error) {
      console.error("Lỗi loading questions:", error);
    }
  };

  const loadAnswers = async (questionId) => {
    if (answersData[questionId]) return;
    Apis.get(endpoints["answers-by-question"](questionId))
      .then((res) => {
        setAnswersData((prev) => ({ ...prev, [questionId]: res.data }));
      })
      .catch((err) => console.error(err));
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answer,
    }));
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      const nextId = questions[currentQuestion + 1].id;
      loadAnswers(nextId);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const handleJumpQuestion = (index) => {
    const qId = questions[index].id;
    loadAnswers(qId);
    setCurrentQuestion(index);
  };

  const calculateResult = () => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    Object.values(selectedAnswers).forEach((ans) => {
      scores[ans.trait] += ans.score;
    });
    return scores;
  };

  // Hàm tính Holland code dựa vào khoảng cách điểm
  const getHollandCodeAdvanced = (scores) => {
    const sorted = Object.entries(scores)
      .sort((a, b) => b[1] - a[1]);

    if (sorted.length === 0) return '';

    const maxScore = sorted[0][1];
    const result = [];

    for (let i = 0; i < sorted.length; i++) {
      const [type, score] = sorted[i];
      if (i === 0) {
        result.push(type);
      } else {
        const percent = (score / maxScore) * 100;
        if (percent >= 50) {
          // Nếu bằng điểm với nhóm trước đó, vẫn thêm
          if (score === sorted[i - 1][1] || percent >= 50) {
            result.push(type);
          }
        } else {
          break; // điểm quá thấp → dừng
        }
      }
      if (result.length === 3) break; // tối đa 3 chữ
    }

    return result.join('');
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  if (questions.length === 0) return <div>Loading...</div>;

  if (finished) {
    const result = calculateResult();
    const hollandCode = getHollandCodeAdvanced(result);
    return <ResultHolland result={result} hollandCode={hollandCode} />;
  }

  const currentQ = questions[currentQuestion];
  const currentAnswers = answersData[currentQ.id] || [];

  return (
    <div className="quiz-container my-5 d-flex">
      <QuestionSection
        currentQ={currentQ}
        currentQuestion={currentQuestion}
        total={questions.length}
        currentAnswers={currentAnswers}
        selectedAnswers={selectedAnswers}
        handleSelectAnswer={handleSelectAnswer}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      <SummaryPanel
        questions={questions}
        selectedAnswers={selectedAnswers}
        currentQuestion={currentQuestion}
        handleJumpQuestion={handleJumpQuestion}
        handleSubmit={() => setFinished(true)}
        onTimeout={() => setFinished(true)}
      />
    </div>
  );
};

export default HollandTest;
