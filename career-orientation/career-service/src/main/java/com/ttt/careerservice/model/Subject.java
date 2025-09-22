package com.ttt.careerservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "subject")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 10)
    @Column(name = "code", length = 10)
    private String code;

    @Size(max = 100)
    @Column(name = "name", length = 100)
    private String name;

    @OneToMany
    @JoinColumn(name = "subject_id")
    private Set<Blocksubject> blocksubjects = new LinkedHashSet<>();

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Blocksubject> getBlocksubjects() {
        return blocksubjects;
    }

    public void setBlocksubjects(Set<Blocksubject> blocksubjects) {
        this.blocksubjects = blocksubjects;
    }

}