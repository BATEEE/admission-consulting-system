package com.ttt.careerservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "block")
public class Block {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 10)
    @Column(name = "name", length = 10)
    private String name;

    @OneToMany
    @JoinColumn(name = "block_id")
    private Set<Blocksubject> blocksubjects = new LinkedHashSet<>();

    @OneToMany
    @JoinColumn(name = "block_id")
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

    public Set<Blocksubject> getBlocksubjects() {
        return blocksubjects;
    }

    public void setBlocksubjects(Set<Blocksubject> blocksubjects) {
        this.blocksubjects = blocksubjects;
    }

    public Set<Majortrainblock> getMajortrainblocks() {
        return majortrainblocks;
    }

    public void setMajortrainblocks(Set<Majortrainblock> majortrainblocks) {
        this.majortrainblocks = majortrainblocks;
    }

}