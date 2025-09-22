package com.ttt.careerservice.dto;

public class QuestionResponseDTO {
    private Integer id;
    private String content;

    public String getContent() {
        return content;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
