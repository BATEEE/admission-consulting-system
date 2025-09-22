package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.AdmissionScoreResultDTO;
import com.ttt.careerservice.service.AdmissionScoreService;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admission-scores")
public class AdmissionScoreController {
    private final AdmissionScoreService admissionScoreService;

    public AdmissionScoreController(AdmissionScoreService admissionScoreService) {
        this.admissionScoreService = admissionScoreService;
    }

    @GetMapping("/suitable")
    public ResponseEntity<Page<AdmissionScoreResultDTO>> findSuitableMajors(
            @RequestParam @NotNull(message = "block không được để trống") Integer blockId,
            @RequestParam @Min(value = 0, message = "userScore phải >= 0") double userScore,
            @RequestParam(required = false) String hollandCode,
            @RequestParam(defaultValue = "1") @Min(value = 1, message = "page phải >= 1") int page,
            @RequestParam(defaultValue = "10") @Min(value = 1, message = "size phải >= 1") int size
    ) {
        Page<AdmissionScoreResultDTO> result =
                admissionScoreService.findSuitableMajors(blockId, userScore, hollandCode, page, size);
        return ResponseEntity.ok(result);
    }
}
