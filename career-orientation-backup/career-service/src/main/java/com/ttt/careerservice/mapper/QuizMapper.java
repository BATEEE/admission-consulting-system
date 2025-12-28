package com.ttt.careerservice.mapper;

import com.ttt.careerservice.dto.QuizRequestDTO;
import com.ttt.careerservice.dto.QuizResponseDTO;
import com.ttt.careerservice.model.Quiz;

public class QuizMapper {
    public static QuizResponseDTO toDTO(Quiz quiz) {
        QuizResponseDTO quizResponseDTO = new QuizResponseDTO();
        quizResponseDTO.setId(quiz.getId());
        quizResponseDTO.setName(quiz.getName());
        quizResponseDTO.setDescription(quiz.getDescription());
        return quizResponseDTO;
    }

    public static Quiz toModel(QuizRequestDTO quizRequestDTO) {
        Quiz quiz = new Quiz();
        quiz.setName(quizRequestDTO.getName());
        quiz.setDescription(quizRequestDTO.getDescription());
        return quiz;
    }
}
