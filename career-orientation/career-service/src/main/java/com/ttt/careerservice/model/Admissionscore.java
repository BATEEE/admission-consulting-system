package com.ttt.careerservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Entity
@Table(name = "admissionscore")
public class Admissionscore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "major_train_block_id", nullable = false)
    private Majortrainblock majorTrainBlock;

    @Column(name = "year")
    private Integer year;

    @Column(name = "score", precision = 5, scale = 2)
    private BigDecimal score;

    @Lob
    @Column(name = "note")
    private String note;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Majortrainblock getMajorTrainBlock() {
        return majorTrainBlock;
    }

    public void setMajorTrainBlock(Majortrainblock majorTrainBlock) {
        this.majorTrainBlock = majorTrainBlock;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

}