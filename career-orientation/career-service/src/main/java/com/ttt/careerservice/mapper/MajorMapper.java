package com.ttt.careerservice.mapper;

import com.ttt.careerservice.dto.MajorResponseDTO;
import com.ttt.careerservice.model.Major;

import java.util.Set;
import java.util.stream.Collectors;

public class MajorMapper {
    public static MajorResponseDTO toDTO(Major major) {
        MajorResponseDTO majorResponseDTO = new MajorResponseDTO();
        majorResponseDTO.setId(major.getId());
        majorResponseDTO.setCode(major.getCode());
        majorResponseDTO.setName(major.getName());
        majorResponseDTO.setMajorGroupId(major.getMajorGroup().getId());
        return majorResponseDTO;
    }

    public static Set<MajorResponseDTO> mapMajorsToDTO(Set<Major> majors) {
        return majors.stream()
                .map(MajorMapper::toDTO)
                .collect(Collectors.toSet());
    }
}
