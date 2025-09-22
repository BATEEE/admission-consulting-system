package com.ttt.careerservice.service;

import com.ttt.careerservice.dto.MajorResponseDTO;
import com.ttt.careerservice.exception.ResourceNotFoundException;
import com.ttt.careerservice.mapper.MajorMapper;
import com.ttt.careerservice.model.Major;
import com.ttt.careerservice.repository.MajorRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class MajorService {
    private final MajorRepository majorRepository;

    public MajorService(MajorRepository majorRepository) {
        this.majorRepository = majorRepository;
    }

    public List<MajorResponseDTO> getMajors() {
        List<Major> majors = majorRepository.findAll();

        return majors.stream().map(MajorMapper::toDTO).toList();
    }

    public MajorResponseDTO getMajorById(Integer id) {
        return majorRepository.findById(id).map(MajorMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Ngành không tồn tại với ID: " + id));
    }

    public List<MajorResponseDTO> getMajorsByMajorGroupId(Integer majorGroupId) {
        return majorRepository.findByMajorGroupId(majorGroupId).stream()
                .map(MajorMapper::toDTO).toList();
    }
}
