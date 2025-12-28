package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.Occupation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OccupationRepository extends JpaRepository<Occupation,Integer>, OccupationRepositoryCustom {
}
