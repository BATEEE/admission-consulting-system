package com.ttt.careerservice.mapper;

import com.ttt.careerservice.dto.TrainingProgramResponseDTO;
import com.ttt.careerservice.model.Trainingprogram;

public class TrainingProgramMapper {
    public static TrainingProgramResponseDTO toDTO(Trainingprogram trainingprogram) {
        TrainingProgramResponseDTO dto = new TrainingProgramResponseDTO();
        dto.setId(trainingprogram.getId());
        dto.setName(trainingprogram.getName());
        dto.setDescription(trainingprogram.getDescription());
        return dto;
    }
}
