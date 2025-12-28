package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.Occupation;

import java.util.List;

public interface OccupationRepositoryCustom {
    List<Occupation> findByHollandCode(String hollandCode);
}
