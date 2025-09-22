package com.ttt.careerservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "trait")
public class Trait {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 50)
    @NotNull
    @Column(name = "code", nullable = false, length = 50)
    private String code;

    @Size(max = 255)
    @Column(name = "name_vie")
    private String nameVie;

    @Size(max = 255)
    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;

    @OneToMany
    @JoinColumn(name = "trait_id")
    private Set<Answer> answers = new LinkedHashSet<>();

    @OneToMany
    @JoinColumn(name = "trait_id")
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

    public String getNameVie() {
        return nameVie;
    }

    public void setNameVie(String nameVie) {
        this.nameVie = nameVie;
    }

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }

    public Set<OccupationTrait> getOccupationTraits() {
        return occupationTraits;
    }

    public void setOccupationTraits(Set<OccupationTrait> occupationTraits) {
        this.occupationTraits = occupationTraits;
    }

}