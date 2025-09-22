package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MajorRepository extends JpaRepository<Major,Integer> {
    List<Major> findByMajorGroupId(Integer majorGroupId);
}
