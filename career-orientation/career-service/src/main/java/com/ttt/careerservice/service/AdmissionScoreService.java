package com.ttt.careerservice.service;

import com.ttt.careerservice.dto.AdmissionScoreResponseDTO;
import com.ttt.careerservice.dto.AdmissionScoreResultDTO;
import com.ttt.careerservice.model.Admissionscore;
import com.ttt.careerservice.model.Occupation;
import com.ttt.careerservice.repository.AdmissionScoreRepository;
import com.ttt.careerservice.repository.MajorOccupationRepository;
import com.ttt.careerservice.repository.OccupationRepository;
import com.ttt.careerservice.repository.OccupationRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdmissionScoreService {
    private final AdmissionScoreRepository admissionScoreRepository;
    private final OccupationRepository occupationRepository;
    private final MajorOccupationRepository majorOccupationRepository;

    public AdmissionScoreService(AdmissionScoreRepository admissionScoreRepository,  OccupationRepository occupationRepository,  MajorOccupationRepository majorOccupationRepository) {
        this.admissionScoreRepository = admissionScoreRepository;
        this.occupationRepository = occupationRepository;
        this.majorOccupationRepository = majorOccupationRepository;
    }

    public List<AdmissionScoreResponseDTO> getAdmissionScores(Integer schoolId, Integer programId) {
        List<Admissionscore> scores = admissionScoreRepository.findBySchoolAndProgram(schoolId, programId);

        Map<String, AdmissionScoreResponseDTO> result = new HashMap<>();

        for (Admissionscore score : scores) {
            String majorName = score.getMajorTrainBlock().getMajorInSchool().getMajor().getName();

            AdmissionScoreResponseDTO dto = result.computeIfAbsent(majorName, k -> new AdmissionScoreResponseDTO(majorName));
            dto.getScores().put(score.getYear(), score.getScore().doubleValue());
        }

        return new ArrayList<>(result.values());
    }

    public Page<AdmissionScoreResultDTO> findSuitableMajors(Integer blockId, double userScore,
                                                            String hollandCode, int page, int size) {
        Integer latestYear = admissionScoreRepository.findLatestYear();
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<Admissionscore> scores;

        if (hollandCode != null && !hollandCode.isBlank()) {
            // Lấy occupation theo Holland
            List<Occupation> occupations = occupationRepository.findByHollandCode(hollandCode);
            List<Integer> occupationIds = occupations.stream()
                    .map(Occupation::getId)
                    .toList();

            if (occupationIds.isEmpty()) {
                return Page.empty(pageable); // không có occupation nào hợp
            }

            // Lấy majors theo occupation
            List<Integer> majorIds = majorOccupationRepository.findMajorIdsByOccupationIds(occupationIds);

            if (majorIds.isEmpty()) {
                return Page.empty(pageable);
            }

            scores = admissionScoreRepository.findSuitableScoresByMajors(blockId, latestYear, userScore, majorIds, pageable);

        } else {
            // Không có HollandCode → query như cũ
            scores = admissionScoreRepository.findSuitableScores(blockId, latestYear, userScore, pageable);
        }

        return scores.map(s -> {
            AdmissionScoreResultDTO dto = new AdmissionScoreResultDTO();
            dto.setSchool(s.getMajorTrainBlock().getMajorInSchool().getSchool().getName());
            dto.setMajor(s.getMajorTrainBlock().getMajorInSchool().getMajor().getName());
            dto.setProgram(s.getMajorTrainBlock().getTrainingProgram().getName());
            dto.setYear(latestYear);
            dto.setBenchmark(s.getScore().doubleValue());
            dto.setDiff(userScore - s.getScore().doubleValue());
            return dto;
        });
    }

}
