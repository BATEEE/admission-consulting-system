package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.MajorResponseDTO;
import com.ttt.careerservice.service.MajorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/majors")
public class MajorController {
    private final MajorService majorService;

    public MajorController(MajorService majorService) {
        this.majorService = majorService;
    }

    @GetMapping
    public ResponseEntity<List<MajorResponseDTO>> getMajors(
            @RequestParam(name = "majorGroupId", required = false) Integer majorGroupId) {
        List<MajorResponseDTO> majorResponseDTOS;
        if( majorGroupId != null ) {
            majorResponseDTOS = majorService.getMajorsByMajorGroupId(majorGroupId);
        } else {
            majorResponseDTOS = majorService.getMajors();
        }

        return ResponseEntity.ok().body(majorResponseDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MajorResponseDTO> getMajorById(@PathVariable Integer id) {
        MajorResponseDTO majorResponseDTO = majorService.getMajorById(id);

        return ResponseEntity.ok().body(majorResponseDTO);
    }
}
