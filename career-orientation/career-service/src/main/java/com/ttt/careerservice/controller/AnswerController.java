package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.AnswerResponseDTO;
import com.ttt.careerservice.model.Answer;
import com.ttt.careerservice.service.AnswerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {
    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping
    public ResponseEntity<List<AnswerResponseDTO>> getAnswers(
            @RequestParam(name = "questionId", required = false) Integer questionId) {
        List<AnswerResponseDTO> answerResponseDTOS;
        if(questionId != null) {
            answerResponseDTOS = answerService.getAnswersByQuestionId(questionId);
        } else {
            answerResponseDTOS = answerService.getAnswers();
        }

        return  ResponseEntity.ok().body(answerResponseDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnswerResponseDTO> getAnswerById(@PathVariable Integer id) {
        AnswerResponseDTO answerResponseDTO = answerService.getAnswerById(id);

        return  ResponseEntity.ok().body(answerResponseDTO);
    }
}
