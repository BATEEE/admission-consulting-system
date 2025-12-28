package com.ttt.careerservice.dto;

public class OccupationResponseDTO {
    private Integer id;
    private String code;
    private String titleEn;
    private String descriptionEn;
    private String titleVie;
    private String descriptionVie;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitleEn() {
        return titleEn;
    }

    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
    }

    public String getDescriptionEn() {
        return descriptionEn;
    }

    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
    }

    public String getTitleVie() {
        return titleVie;
    }

    public void setTitleVie(String titleVie) {
        this.titleVie = titleVie;
    }

    public String getDescriptionVie() {
        return descriptionVie;
    }

    public void setDescriptionVie(String descriptionVie) {
        this.descriptionVie = descriptionVie;
    }
}
