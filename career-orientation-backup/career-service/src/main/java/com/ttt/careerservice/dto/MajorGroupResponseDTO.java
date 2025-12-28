package com.ttt.careerservice.dto;

import java.util.Set;

public class MajorGroupResponseDTO {
    private Integer id;
    private String code;
    private String name;
    private Set<MajorResponseDTO> majors;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Set<MajorResponseDTO> getMajors() {
        return majors;
    }

    public void setMajors(Set<MajorResponseDTO> majors) {
        this.majors = majors;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
