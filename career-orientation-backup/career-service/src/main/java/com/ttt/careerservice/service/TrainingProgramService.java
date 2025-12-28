package com.ttt.careerservice.service;

import com.ttt.careerservice.dto.TrainingProgramResponseDTO;
import com.ttt.careerservice.mapper.TrainingProgramMapper;
import com.ttt.careerservice.repository.TrainingProgramRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingProgramService {
    private final TrainingProgramRepository trainingProgramRepository;

    public TrainingProgramService(TrainingProgramRepository trainingProgramRepository) {
        this.trainingProgramRepository = trainingProgramRepository;
    }

    public List<TrainingProgramResponseDTO> getTrainingPrograms(Integer schoolId) {
        return trainingProgramRepository.findBySchoolId(schoolId)
                .stream()
                .map(TrainingProgramMapper::toDTO)
                .toList();
    }
}
