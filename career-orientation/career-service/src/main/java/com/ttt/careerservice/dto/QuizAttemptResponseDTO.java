package com.ttt.careerservice.dto;

import jakarta.validation.constraints.*;

import java.util.Map;

public class QuizAttemptResponseDTO {
    @NotNull
    private Integer quizId;

    @NotBlank
    @Size(max = 50)
    private String result;       // ví dụ: "RIA"

    @NotBlank
    @Size(max = 50)
    private String resultCode;   // mã Holland

    @NotNull
    @Size(min = 1)
    private Map<String, @DecimalMin("0.0") Double> scoreDetails;

    public Integer getQuizId() {
        return quizId;
    }

    public void setQuizId(Integer quizId) {
        this.quizId = quizId;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public Map<String, Double> getScoreDetails() {
        return scoreDetails;
    }

    public void setScoreDetails(Map<String, Double> scoreDetails) {
        this.scoreDetails = scoreDetails;
    }
}
