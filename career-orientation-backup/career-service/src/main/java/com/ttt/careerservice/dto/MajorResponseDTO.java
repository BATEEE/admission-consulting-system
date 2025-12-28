package com.ttt.careerservice.dto;

public class MajorResponseDTO {
    private Integer id;
    private String code;
    private String name;
    private Integer majorGroupId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Integer getMajorGroupId() {
        return majorGroupId;
    }

    public void setMajorGroupId(Integer majorGroupId) {
        this.majorGroupId = majorGroupId;
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
