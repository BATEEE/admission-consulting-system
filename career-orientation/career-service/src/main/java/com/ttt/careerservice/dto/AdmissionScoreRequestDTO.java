package com.ttt.careerservice.dto;

import java.util.Map;

public class AdmissionScoreRequestDTO {
    private Integer blockId;
    private Map<String, Double> scores;

    public Integer getBlockId() {
        return blockId;
    }

    public void setBlockId(Integer blockId) {
        this.blockId = blockId;
    }

    public Map<String, Double> getScores() {
        return scores;
    }

    public void setScores(Map<String, Double> scores) {
        this.scores = scores;
    }
}
