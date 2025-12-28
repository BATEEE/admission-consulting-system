package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.Majorgroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorGroupRepository extends JpaRepository<Majorgroup, Integer> {
}
