package com.ttt.careerservice.mapper;

import com.ttt.careerservice.dto.QuestionResponseDTO;
import com.ttt.careerservice.model.Question;

public class QuestionMapper {
    public static QuestionResponseDTO toDTO(Question question) {
        QuestionResponseDTO questionResponseDTO = new QuestionResponseDTO();
        questionResponseDTO.setId(question.getId());
        questionResponseDTO.setContent(question.getContent());
        return questionResponseDTO;
    }
}
