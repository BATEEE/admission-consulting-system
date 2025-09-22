package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    @Query("SELECT DISTINCT q FROM Question q JOIN q.answers a WHERE a.trait.code = :traitCode")
    List<Question> findQuestionsByTrait(@Param("traitCode") String traitCode);
}
