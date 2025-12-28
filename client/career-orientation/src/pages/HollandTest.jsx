import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Button, Offcanvas } from "react-bootstrap"; 
import Apis, { endpoints } from "../configs/Apis";
import "../styles/HollandTest.css";
import ResultHolland from "../components/ResultHolland";
import QuestionSection from "../components/QuestionSection";
import SummaryPanel from "../components/SummaryPanel";
import CountdownTimer from "../components/CountdownTimer"; // Đảm bảo import CountdownTimer

const HollandTest = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answersData, setAnswersData] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [finished, setFinished] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 
    const [showSummaryMobile, setShowSummaryMobile] = useState(false); 

    const handleShowSummary = () => setShowSummaryMobile(true);
    const handleCloseSummary = () => setShowSummaryMobile(false);

    const handleTimeout = useCallback(() => {
        setFinished(true);
    }, [setFinished]);


    const loadQuestions = async () => {
        try {
            setIsLoading(true);
            const url = `${endpoints["questions-random"]}?total=18`;
            const res = await Apis.get(url);
            setQuestions(res.data);
            if (res.data.length > 0) loadAnswers(res.data[0].id);
        } catch (error) {
            console.error("Lỗi loading questions:", error);
        } finally {
            setIsLoading(false);
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
    
    const handleJumpQuestion = (index) => {
        const qId = questions[index].id;
        loadAnswers(qId);
        setCurrentQuestion(index);
        handleCloseSummary();
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

    const calculateResult = () => {
        const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        Object.values(selectedAnswers).forEach((ans) => {
            scores[ans.trait] += ans.score;
        });
        return scores;
    };

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
                    if (score === sorted[i - 1][1] || percent >= 50) {
                        result.push(type);
                    }
                } else {
                    break;
                }
            }
            if (result.length === 3) break;
        }

        return result.join('');
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    if (isLoading || questions.length === 0) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" role="status" />
                <p className="mt-2">Đang tải câu hỏi...</p>
            </div>
        );
    }

    if (finished) {
        const result = calculateResult();
        const hollandCode = getHollandCodeAdvanced(result);
        return <ResultHolland result={result} hollandCode={hollandCode} />;
    }

    const currentQ = questions[currentQuestion];
    const currentAnswers = answersData[currentQ.id] || [];
    const answeredCount = Object.keys(selectedAnswers).length;

    return (
        <Container 
            className="my-4 my-lg-5" 
            style={{ maxWidth: "1200px" }}
        >
            <Row>
                <Col 
                    xs={12} 
                    lg={8} 
                    className="mb-4 mb-lg-0"
                >
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

                    {/* Nút XEM TIẾN TRÌNH / NỘP BÀI TRÊN MOBILE */}
                    <div className="d-lg-none mt-4">
                        <Button 
                            variant="outline-info" 
                            onClick={handleShowSummary} 
                            className="w-100 mb-3"
                        >
                            <i className="bi bi-list-check me-2"></i>
                            Xem Tiến trình ({answeredCount}/{questions.length})
                        </Button>
                        
                        <Button 
                            variant="success" 
                            onClick={() => setFinished(true)}
                            className="w-100" 
                            disabled={answeredCount < questions.length}
                        >
                            Nộp bài kiểm tra
                        </Button>
                        {answeredCount < questions.length && (
                            <p className="text-danger mt-2 text-center">Vui lòng hoàn thành tất cả các câu hỏi.</p>
                        )}
                    </div>
                </Col>

                {/* SUMMARY PANEL TRÊN PC */}
                <Col 
                    xs={12} 
                    lg={4} 
                    className="d-none d-lg-block" 
                >
                    <div className="summary-timer-pc border rounded p-3 bg-white shadow-sm ms-4 mb-3">
                        <CountdownTimer minutes={30} onTimeout={handleTimeout} />
                    </div>

                    <SummaryPanel
                        questions={questions}
                        selectedAnswers={selectedAnswers}
                        currentQuestion={currentQuestion}
                        handleJumpQuestion={handleJumpQuestion}
                        handleSubmit={() => setFinished(true)}
                    />
                </Col>
            </Row>
            
            {/* OFFCANVAS (SIDEBAR) CHO MOBILE */}
            <Offcanvas 
                show={showSummaryMobile} 
                onHide={handleCloseSummary} 
                placement="end" 
                scroll={true} 
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="fw-bold text-primary">
                        Tiến trình Làm bài
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0">
                    {/* ĐẶT CountdownTimer Ở ĐÂY CHO MOBILE */}
                    <div className="p-3 border-bottom">
                        <CountdownTimer minutes={30} onTimeout={handleTimeout} />
                    </div>
                    
                    <SummaryPanel
                        questions={questions}
                        selectedAnswers={selectedAnswers}
                        currentQuestion={currentQuestion}
                        handleJumpQuestion={handleJumpQuestion} 
                        handleSubmit={() => setFinished(true)}
                    />
                    <div className="p-3 border-top">
                        <Button
                            variant="success"
                            onClick={() => setFinished(true)}
                            className="w-100"
                            disabled={answeredCount < questions.length}
                        >
                            Nộp bài kiểm tra
                        </Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};

export default HollandTest;