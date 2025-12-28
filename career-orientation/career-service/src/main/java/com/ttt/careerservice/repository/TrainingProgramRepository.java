package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.Trainingprogram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TrainingProgramRepository extends JpaRepository<Trainingprogram, Integer> {

    @Query("""
                SELECT DISTINCT tp
                FROM Trainingprogram tp
                JOIN Majortrainblock mtb ON mtb.trainingProgram = tp
                JOIN Majorinschool mis ON mtb.majorInSchool = mis
                JOIN School s ON mis.school = s
                WHERE s.id = :schoolId
            """)
    List<Trainingprogram> findBySchoolId(@Param("schoolId") Integer schoolId);
}

