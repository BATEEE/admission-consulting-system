package com.ttt.careerservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "majortrainblock")
public class Majortrainblock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "major_in_school_id", nullable = false)
    private Majorinschool majorInSchool;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "training_program_id", nullable = false)
    private Trainingprogram trainingProgram;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "block_id", nullable = false)
    private Block block;

    @OneToMany
    @JoinColumn(name = "major_train_block_id")
    private Set<Admissionscore> admissionscores = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Majorinschool getMajorInSchool() {
        return majorInSchool;
    }

    public void setMajorInSchool(Majorinschool majorInSchool) {
        this.majorInSchool = majorInSchool;
    }

    public Trainingprogram getTrainingProgram() {
        return trainingProgram;
    }

    public void setTrainingProgram(Trainingprogram trainingProgram) {
        this.trainingProgram = trainingProgram;
    }

    public Block getBlock() {
        return block;
    }

    public void setBlock(Block block) {
        this.block = block;
    }

    public Set<Admissionscore> getAdmissionscores() {
        return admissionscores;
    }

    public void setAdmissionscores(Set<Admissionscore> admissionscores) {
        this.admissionscores = admissionscores;
    }

}