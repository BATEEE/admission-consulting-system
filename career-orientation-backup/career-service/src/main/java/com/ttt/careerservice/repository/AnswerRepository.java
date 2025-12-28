package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Integer> {
    List<Answer> findByQuestionId(Integer questionId);
    boolean existsByQuestionId(Integer questionId);
}
