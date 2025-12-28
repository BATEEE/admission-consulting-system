package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.QuizRequestDTO;
import com.ttt.careerservice.dto.QuizResponseDTO;
import com.ttt.careerservice.service.QuizService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
public class QuizController {
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping
    public ResponseEntity<List<QuizResponseDTO>> getQuizzes() {
        List<QuizResponseDTO> quizResponseDTOS = quizService.getQuizzes();

        return ResponseEntity.ok().body(quizResponseDTOS);
    }

    @PostMapping
    public ResponseEntity<QuizResponseDTO> createQuiz(@Valid @RequestBody QuizRequestDTO quizRequestDTO) {
        QuizResponseDTO quizResponseDTO = quizService.createQuiz(quizRequestDTO);

        return ResponseEntity.ok().body(quizResponseDTO);
    }
}
