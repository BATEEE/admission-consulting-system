package com.ttt.careerservice.model;

import com.ttt.careerservice.enums.SchoolType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "school")
public class School {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 20)
    @Column(name = "code", length = 20)
    private String code;

    @Size(max = 255)
    @Column(name = "name")
    private String name;

    @Size(max = 255)
    @Column(name = "location")
    private String location;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'UNIVERSITY'")
    @Column(name = "type", nullable = false)
    private SchoolType type;

    @OneToMany
    @JoinColumn(name = "school_id")
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public SchoolType getType() {
        return type;
    }

    public void setType(SchoolType type) {
        this.type = type;
    }

    public Set<Majorinschool> getMajorinschools() {
        return majorinschools;
    }

    public void setMajorinschools(Set<Majorinschool> majorinschools) {
        this.majorinschools = majorinschools;
    }

}