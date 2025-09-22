package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.MajorOccupation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MajorOccupationRepository extends JpaRepository<MajorOccupation,Integer> {
    @Query("SELECT DISTINCT mo.major.id FROM MajorOccupation mo WHERE mo.occupation.id IN :occupationIds")
    List<Integer> findMajorIdsByOccupationIds(@Param("occupationIds") List<Integer> occupationIds);
}
