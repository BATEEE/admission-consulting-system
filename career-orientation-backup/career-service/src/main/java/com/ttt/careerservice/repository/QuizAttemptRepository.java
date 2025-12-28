package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.Quizattempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<Quizattempt, Integer> {
    List<Quizattempt> findByStudentId(Integer studentId);
}
