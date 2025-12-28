package com.ttt.careerservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "trainingprogram")
public class Trainingprogram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "name")
    private String name;

    @Lob
    @Column(name = "description")
    private String description;

    @OneToMany
    @JoinColumn(name = "training_program_id")
    private Set<Majortrainblock> majortrainblocks = new LinkedHashSet<>();

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Majortrainblock> getMajortrainblocks() {
        return majortrainblocks;
    }

    public void setMajortrainblocks(Set<Majortrainblock> majortrainblocks) {
        this.majortrainblocks = majortrainblocks;
    }

}