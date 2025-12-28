package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.AdmissionScoreResponseDTO;
import com.ttt.careerservice.dto.SchoolResponseDTO;
import com.ttt.careerservice.dto.TrainingProgramResponseDTO;
import com.ttt.careerservice.service.AdmissionScoreService;
import com.ttt.careerservice.service.SchoolService;
import com.ttt.careerservice.service.TrainingProgramService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schools")
public class SchoolController {
    private final SchoolService schoolService;
    private final TrainingProgramService trainingProgramService;
    private final AdmissionScoreService admissionScoreService;

    public SchoolController(SchoolService schoolService,  TrainingProgramService trainingProgramService, AdmissionScoreService admissionScoreService) {
        this.schoolService = schoolService;
        this.trainingProgramService = trainingProgramService;
        this.admissionScoreService = admissionScoreService;
    }

    @GetMapping
    public Page<SchoolResponseDTO> getSchools(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String q) {

        if (q != null && !q.isEmpty()) {
            return schoolService.searchSchools(q, PageRequest.of(page, size));
        }
        return schoolService.getSchools(PageRequest.of(page, size));
    }
    @GetMapping("/{id}")
    public ResponseEntity<SchoolResponseDTO> getSchoolById(@PathVariable Integer id) {
        SchoolResponseDTO schoolResponseDTO = schoolService.getSchoolById(id);

        return  ResponseEntity.ok().body(schoolResponseDTO);
    }

    @GetMapping("/{id}/training-programs")
    public List<TrainingProgramResponseDTO> getTrainingPrograms(@PathVariable Integer id) {
        return trainingProgramService.getTrainingPrograms(id);
    }

    @GetMapping("/{schoolId}/training-programs/{programId}/admission-scores")
    public List<AdmissionScoreResponseDTO> getAdmissionScores(
            @PathVariable Integer schoolId,
            @PathVariable Integer programId
    ) {
        return admissionScoreService.getAdmissionScores(schoolId, programId);
    }
}
