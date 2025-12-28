package com.ttt.careerservice.mapper;

import com.ttt.careerservice.dto.SubjectResponseDTO;
import com.ttt.careerservice.model.Subject;

public class SubjectMapper {
    public static SubjectResponseDTO toDTO(Subject subject) {
        SubjectResponseDTO dto = new SubjectResponseDTO();
        dto.setId(subject.getId());
        dto.setCode(subject.getCode());
        dto.setName(subject.getName());
        return dto;
    }
}
