package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.Block;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlockRepository extends CrudRepository<Block,Integer> {
    @Query("SELECT b FROM Block b JOIN FETCH b.blocksubjects bs JOIN FETCH bs.subject")
    List<Block> findAllWithSubjects();
}
