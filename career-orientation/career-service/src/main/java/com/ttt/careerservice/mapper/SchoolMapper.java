package com.ttt.careerservice.mapper;

import com.ttt.careerservice.dto.SchoolResponseDTO;
import com.ttt.careerservice.model.School;

public class SchoolMapper {
    public static SchoolResponseDTO toDTO(School school) {
        SchoolResponseDTO schoolResponseDTO = new SchoolResponseDTO();
        schoolResponseDTO.setId(school.getId());
        schoolResponseDTO.setName(school.getName());
        schoolResponseDTO.setCode(school.getCode());
        schoolResponseDTO.setLocation(school.getLocation());
        return schoolResponseDTO;
    }
}
