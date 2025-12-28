package com.ttt.careerservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "quiz")
public class Quiz {
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
    @JoinColumn(name = "quiz_id")
    private Set<Question> questions = new LinkedHashSet<>();

    @OneToMany
    @JoinColumn(name = "quiz_id")
    private Set<Quizattempt> quizattempts = new LinkedHashSet<>();

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

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    public Set<Quizattempt> getQuizattempts() {
        return quizattempts;
    }

    public void setQuizattempts(Set<Quizattempt> quizattempts) {
        this.quizattempts = quizattempts;
    }

}