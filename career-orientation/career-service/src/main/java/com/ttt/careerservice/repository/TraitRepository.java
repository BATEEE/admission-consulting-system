package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.Trait;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.nio.channels.FileChannel;
import java.util.Optional;

@Repository
public interface TraitRepository extends JpaRepository<Trait, Integer> {
    Optional<Trait> findByCode(String code);
}
