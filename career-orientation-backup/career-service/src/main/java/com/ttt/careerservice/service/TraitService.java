package com.ttt.careerservice.service;

import com.ttt.careerservice.dto.TraitResponseDTO;
import com.ttt.careerservice.exception.ResourceNotFoundException;
import com.ttt.careerservice.mapper.TraitMapper;
import com.ttt.careerservice.model.Trait;
import com.ttt.careerservice.repository.TraitRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TraitService {
    private final TraitRepository traitRepository;

    public TraitService(TraitRepository traitRepository) {
        this.traitRepository = traitRepository;
    }

    public List<TraitResponseDTO> getTraits() {
        List<Trait> traits = traitRepository.findAll();

        return traits.stream().map(TraitMapper::toDTO).toList();
    }

    public TraitResponseDTO getTraitById(Integer id) {
        return traitRepository.findById(id).map(TraitMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Ngành nghề không tồn tại với ID: " + id));
    }

    public TraitResponseDTO getTraitByCode(String code) {
        return traitRepository.findByCode(code)
                .map(TraitMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy trait với code: " + code));

    }
}
