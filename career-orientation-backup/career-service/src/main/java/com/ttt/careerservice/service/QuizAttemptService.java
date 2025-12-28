package com.ttt.careerservice.service;

import com.ttt.careerservice.dto.QuizAttemptResponseDTO;
import com.ttt.careerservice.model.Quiz;
import com.ttt.careerservice.model.Quizattempt;
import com.ttt.careerservice.model.Student;
import com.ttt.careerservice.repository.QuizAttemptRepository;
import com.ttt.careerservice.repository.QuizRepository;
import com.ttt.careerservice.repository.StudentRepository;
import com.ttt.careerservice.utils.ScoreDetailsMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizAttemptService {
    private final QuizAttemptRepository quizAttemptRepository;
    private final StudentRepository studentRepository;
    private final QuizRepository quizRepository;

    public QuizAttemptService(QuizAttemptRepository quizAttemptRepository,
                                StudentRepository studentRepository,
                                QuizRepository quizRepository) {
        this.quizAttemptRepository = quizAttemptRepository;
        this.studentRepository = studentRepository;
        this.quizRepository = quizRepository;
    }

    public List<QuizAttemptResponseDTO> getQuizAttemptsByStudent(Integer studentId) {
        return quizAttemptRepository.findByStudentId(studentId)
                .stream()
                .map(qa -> {
                    QuizAttemptResponseDTO dto = new QuizAttemptResponseDTO();
                    dto.setQuizId(qa.getQuiz().getId());
                    dto.setResult(qa.getResult());
                    dto.setResultCode(qa.getResultCode());
                    dto.setScoreDetails(ScoreDetailsMapper.fromJson(qa.getScoreDetails()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public QuizAttemptResponseDTO saveQuizAttempt(Integer studentId, QuizAttemptResponseDTO dto) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Quiz quiz = quizRepository.findById(dto.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        Quizattempt qa = new Quizattempt();
        qa.setStudent(student);
        qa.setQuiz(quiz);
        qa.setResult(dto.getResult());
        qa.setResultCode(dto.getResultCode());
        qa.setScoreDetails(ScoreDetailsMapper.toJson(dto.getScoreDetails()));

        Quizattempt saved = quizAttemptRepository.save(qa);

        // Chuyển entity -> DTO trước khi trả về
        QuizAttemptResponseDTO responseDto = new QuizAttemptResponseDTO();
        responseDto.setQuizId(saved.getQuiz().getId());
        responseDto.setResult(saved.getResult());
        responseDto.setResultCode(saved.getResultCode());
        responseDto.setScoreDetails(ScoreDetailsMapper.fromJson(saved.getScoreDetails()));

        return responseDto;
    }

}
