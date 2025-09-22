package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.Admissionscore;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdmissionScoreRepository extends JpaRepository<Admissionscore, Integer> {
    @Query("""
        SELECT a
        FROM Admissionscore a
        JOIN Majortrainblock mtb ON a.majorTrainBlock.id = mtb.id
        JOIN Majorinschool mis ON mtb.majorInSchool.id = mis.id
        WHERE mis.school.id = :schoolId AND mtb.trainingProgram.id = :programId
    """)
    List<Admissionscore> findBySchoolAndProgram(
            @Param("schoolId") Integer schoolId,
            @Param("programId") Integer programId
    );


    @Query("SELECT a FROM Admissionscore a " +
            "JOIN a.majorTrainBlock mtb " +
            "JOIN mtb.majorInSchool mis " +
            "JOIN mis.school s " +
            "JOIN mtb.trainingProgram tp " +
            "WHERE mtb.block.id = :blockId AND a.year = :year")
    List<Admissionscore> findByBlockAndYear(@Param("blockId") Integer blockId,
                                            @Param("year") Integer year);

    @Query("SELECT MAX(a.year) FROM Admissionscore a")
    Integer findLatestYear();

    @Query("SELECT a FROM Admissionscore a " +
            "WHERE a.majorTrainBlock.block.id = :blockId AND a.year = :year " +
            "ORDER BY a.score DESC")
    Page<Admissionscore> findByBlockAndYearOrderByScoreDesc(
            @Param("blockId") Integer blockId,
            @Param("year") Integer year,
            Pageable pageable);

    @Query("SELECT a FROM Admissionscore a " +
            "WHERE a.majorTrainBlock.block.id = :blockId " +
            "AND a.year = :year " +
            "AND (a.score - :userScore) BETWEEN -2 AND 0.5 " +
            "ORDER BY a.score DESC")
    Page<Admissionscore> findSuitableScores(
            @Param("blockId") Integer blockId,
            @Param("year") Integer year,
            @Param("userScore") double userScore,
            Pageable pageable);


    @Query("SELECT a FROM Admissionscore a " +
            "WHERE a.majorTrainBlock.block.id = :blockId " +
            "AND a.year = :year " +
            "AND a.majorTrainBlock.majorInSchool.major.id IN :majorIds " +
            "AND (a.score - :userScore) BETWEEN -2 AND 0.5 " +
            "ORDER BY a.score DESC")
    Page<Admissionscore> findSuitableScoresByMajors(
            @Param("blockId") Integer blockId,
            @Param("year") Integer year,
            @Param("userScore") double userScore,
            @Param("majorIds") List<Integer> majorIds,
            Pageable pageable);

}
