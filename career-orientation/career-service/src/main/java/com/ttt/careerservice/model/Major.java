package com.ttt.careerservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "major")
public class Major {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 10)
    @Column(name = "code", length = 10)
    private String code;

    @Size(max = 255)
    @Column(name = "name")
    private String name;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "major_group_id", nullable = false)
    private Majorgroup majorGroup;

    @OneToMany
    @JoinColumn(name = "major_id")
    private Set<Majorinschool> majorinschools = new LinkedHashSet<>();

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

    public Majorgroup getMajorGroup() {
        return majorGroup;
    }

    public void setMajorGroup(Majorgroup majorGroup) {
        this.majorGroup = majorGroup;
    }

    public Set<Majorinschool> getMajorinschools() {
        return majorinschools;
    }

    public void setMajorinschools(Set<Majorinschool> majorinschools) {
        this.majorinschools = majorinschools;
    }

}