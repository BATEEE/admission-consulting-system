package com.ttt.careerservice.service;

import com.ttt.careerservice.dto.QuizRequestDTO;
import com.ttt.careerservice.dto.QuizResponseDTO;
import com.ttt.careerservice.mapper.QuizMapper;
import com.ttt.careerservice.model.Quiz;
import com.ttt.careerservice.repository.QuizRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class QuizService {
    private final QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public List<QuizResponseDTO> getQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();

        return quizzes.stream().map(QuizMapper::toDTO).toList();
    }

    public QuizResponseDTO createQuiz(QuizRequestDTO quizRequestDTO) {
        Quiz newQuiz = quizRepository.save(QuizMapper.toModel(quizRequestDTO));

        return QuizMapper.toDTO(newQuiz);
    }
}
