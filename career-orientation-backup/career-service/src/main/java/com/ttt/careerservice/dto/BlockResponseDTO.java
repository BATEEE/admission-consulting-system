package com.ttt.careerservice.dto;

import java.util.List;

public class BlockResponseDTO {
    private Integer id;
    private String name;
    private List<SubjectResponseDTO> subjects;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SubjectResponseDTO> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectResponseDTO> subjects) {
        this.subjects = subjects;
    }
}
