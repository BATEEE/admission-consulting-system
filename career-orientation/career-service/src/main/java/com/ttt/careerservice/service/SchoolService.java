package com.ttt.careerservice.service;

import com.ttt.careerservice.dto.SchoolResponseDTO;
import com.ttt.careerservice.exception.ResourceNotFoundException;
import com.ttt.careerservice.mapper.SchoolMapper;
import com.ttt.careerservice.repository.SchoolRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SchoolService {
    private final SchoolRepository schoolRepository;

    public SchoolService(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    public Page<SchoolResponseDTO> getSchools(Pageable pageable) {
        return schoolRepository.findAll(pageable).map(SchoolMapper::toDTO);
    }

    public Page<SchoolResponseDTO> searchSchools(String q, Pageable pageable) {
        return schoolRepository.findByNameContainingIgnoreCaseOrCodeContainingIgnoreCase(q, q, pageable)
                .map(SchoolMapper::toDTO);
    }

    public SchoolResponseDTO getSchoolById(Integer id) {
        return schoolRepository.findById(id).map(SchoolMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Trường học không tồn tại với ID: " + id));
    }
}
