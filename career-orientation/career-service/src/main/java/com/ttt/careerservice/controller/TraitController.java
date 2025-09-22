package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.TraitResponseDTO;
import com.ttt.careerservice.service.TraitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/traits")
public class TraitController {
    private final TraitService traitService;

    public TraitController(TraitService traitService) {
        this.traitService = traitService;
    }

    @GetMapping
    public ResponseEntity<List<TraitResponseDTO>> getTraits() {
        List<TraitResponseDTO> traitResponseDTOS = traitService.getTraits();

        return  ResponseEntity.ok().body(traitResponseDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TraitResponseDTO> getTraitById(@PathVariable Integer id) {
        TraitResponseDTO traitResponseDTO = traitService.getTraitById(id);

        return  ResponseEntity.ok().body(traitResponseDTO);
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<TraitResponseDTO> getTraitByCode(@PathVariable String code) {
        TraitResponseDTO traitResponseDTO = traitService.getTraitByCode(code);

        return ResponseEntity.ok().body(traitResponseDTO);
    }
}
