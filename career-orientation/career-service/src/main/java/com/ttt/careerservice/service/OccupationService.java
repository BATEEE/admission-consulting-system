package com.ttt.careerservice.service;

import com.ttt.careerservice.dto.OccupationResponseDTO;
import com.ttt.careerservice.exception.ResourceNotFoundException;
import com.ttt.careerservice.mapper.OccupationMapper;
import com.ttt.careerservice.model.Occupation;
import com.ttt.careerservice.repository.OccupationRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class OccupationService {
    private final OccupationRepository occupationRepository;

    public OccupationService(OccupationRepository occupationRepository) {
        this.occupationRepository = occupationRepository;
    }

    public List<OccupationResponseDTO> getOccupations() {
        List<Occupation> occupations = occupationRepository.findAll();

        return occupations.stream().map(OccupationMapper::toDTO).toList();
    }

    public OccupationResponseDTO getOccupationById(Integer id) {
        return occupationRepository.findById(id).map(OccupationMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Nghề nghiệp không tồn tại với ID: " + id));
    }

    public List<OccupationResponseDTO> getByHollandCode(String hollandCode) {
        List<Occupation> occupations = occupationRepository.findByHollandCode(hollandCode);

        if (occupations == null || occupations.isEmpty()) {
            return Collections.emptyList();
        }

        return occupations.stream()
                .map(OccupationMapper::toDTO)
                .toList();
    }

}
