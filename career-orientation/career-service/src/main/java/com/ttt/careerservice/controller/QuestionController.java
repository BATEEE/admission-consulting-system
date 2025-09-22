package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.AnswerResponseDTO;
import com.ttt.careerservice.dto.QuestionResponseDTO;
import com.ttt.careerservice.service.AnswerService;
import com.ttt.careerservice.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;
    private final AnswerService answerService;

    public QuestionController(QuestionService questionService, AnswerService answerService) {
        this.questionService = questionService;
        this.answerService = answerService;

    }

    @GetMapping
    public ResponseEntity<List<QuestionResponseDTO>> getQuestions() {
        List<QuestionResponseDTO> questionResponseDTOS = questionService.getQuestions();

        return  ResponseEntity.ok().body(questionResponseDTOS);
    }

    @GetMapping("/random")
    public ResponseEntity<List<QuestionResponseDTO>> getQuestionsRandom(@RequestParam(defaultValue = "30") int total) {
        return ResponseEntity.ok(questionService.getQuestionsRandom(total));
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponseDTO> getQuestionById(@PathVariable Integer id) {
        QuestionResponseDTO questionResponseDTO = questionService.getQuestionById(id);

        return  ResponseEntity.ok().body(questionResponseDTO);
    }

    @GetMapping("/{id}/answers")
    public ResponseEntity<List<AnswerResponseDTO>> getAnswersByQuestionId(@PathVariable Integer id) {
        List<AnswerResponseDTO> answerResponseDTOS = answerService.getAnswersByQuestionId(id);

        return  ResponseEntity.ok().body(answerResponseDTOS);
    }
}
