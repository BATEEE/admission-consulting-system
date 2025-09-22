package com.ttt.careerservice.mapper;

import com.ttt.careerservice.dto.AnswerResponseDTO;
import com.ttt.careerservice.model.Answer;

public class AnswerMapper {
    public static AnswerResponseDTO toDTO(Answer answer) {
        AnswerResponseDTO answerResponseDTO = new AnswerResponseDTO();
        answerResponseDTO.setId(answer.getId());
        answerResponseDTO.setContent(answer.getContent());
        answerResponseDTO.setScore(answer.getScore());
        answerResponseDTO.setTrait(answer.getTrait().getCode());
        answerResponseDTO.setQuestionId(answer.getQuestion().getId());
        return answerResponseDTO;
    }
}
