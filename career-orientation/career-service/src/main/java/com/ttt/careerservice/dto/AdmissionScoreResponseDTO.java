package com.ttt.careerservice.dto;

import java.util.HashMap;
import java.util.Map;

public class AdmissionScoreResponseDTO {
    private String majorName;
    private Map<Integer, Double> scores;

    public AdmissionScoreResponseDTO(String majorName) {
        this.majorName = majorName;
        this.scores = new HashMap<>();
    }

    public Map<Integer, Double> getScores() {
        return scores;
    }

    public void setScores(Map<Integer, Double> scores) {
        this.scores = scores;
    }

    public String getMajorName() {
        return majorName;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }
}
