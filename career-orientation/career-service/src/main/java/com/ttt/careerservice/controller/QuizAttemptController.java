package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.QuizAttemptResponseDTO;
import com.ttt.careerservice.service.QuizAttemptService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz-attempts")
public class QuizAttemptController {
    private final QuizAttemptService quizAttemptService;

    public QuizAttemptController(QuizAttemptService quizAttemptService) {
        this.quizAttemptService = quizAttemptService;
    }

    @GetMapping
    public ResponseEntity<List<QuizAttemptResponseDTO>> getQuizAttempts(@RequestParam Integer studentId) {
        List<QuizAttemptResponseDTO> attempts = quizAttemptService.getQuizAttemptsByStudent(studentId);
        return ResponseEntity.ok(attempts);
    }

    @PostMapping
    public ResponseEntity<?> saveQuizAttempt(@RequestParam Integer studentId,
                                             @Valid @RequestBody QuizAttemptResponseDTO dto) {
        try {
            QuizAttemptResponseDTO savedDto = quizAttemptService.saveQuizAttempt(studentId, dto);
            return ResponseEntity.ok(savedDto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
