package com.ttt.careerservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "occupation")
public class Occupation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 20)
    @NotNull
    @Column(name = "code", nullable = false, length = 20)
    private String code;

    @Size(max = 255)
    @Column(name = "title_en")
    private String titleEn;

    @Lob
    @Column(name = "description_en", columnDefinition = "LONGTEXT")
    private String descriptionEn;

    @Size(max = 255)
    @Column(name = "title_vie")
    private String titleVie;

    @Lob
    @Column(name = "description_vie", columnDefinition = "LONGTEXT")
    private String descriptionVie;

    @OneToMany
    @JoinColumn(name = "occupation_id")
    private Set<OccupationTrait> occupationTraits = new LinkedHashSet<>();

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

    public Set<OccupationTrait> getOccupationTraits() {
        return occupationTraits;
    }

    public void setOccupationTraits(Set<OccupationTrait> occupationTraits) {
        this.occupationTraits = occupationTraits;
    }

}