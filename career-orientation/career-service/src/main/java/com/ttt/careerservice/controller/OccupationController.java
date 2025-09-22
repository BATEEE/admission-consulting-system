package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.OccupationResponseDTO;
import com.ttt.careerservice.service.OccupationService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/occupations")
public class OccupationController {
    private final OccupationService occupationService;

    public OccupationController(OccupationService occupationService) {
        this.occupationService = occupationService;
    }

    @GetMapping
    public ResponseEntity<List<OccupationResponseDTO>> getOccupations() {
        List<OccupationResponseDTO> occupationResponseDTOS = occupationService.getOccupations();

        return  ResponseEntity.ok().body(occupationResponseDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OccupationResponseDTO> getOccupationById(@PathVariable Integer id) {
        OccupationResponseDTO occupationResponseDTO = occupationService.getOccupationById(id);

        return  ResponseEntity.ok().body(occupationResponseDTO);
    }

    @GetMapping("/holland/{code}")
    public ResponseEntity<List<OccupationResponseDTO>> getByHollandCode(
            @PathVariable("code") @NotBlank String code) {

        List<OccupationResponseDTO> occupations = occupationService.getByHollandCode(code);

        return ResponseEntity.ok(occupations);
    }

}
