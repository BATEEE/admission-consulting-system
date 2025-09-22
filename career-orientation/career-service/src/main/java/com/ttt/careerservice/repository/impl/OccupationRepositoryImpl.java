package com.ttt.careerservice.repository.impl;

import com.ttt.careerservice.model.Occupation;
import com.ttt.careerservice.model.OccupationTrait;
import com.ttt.careerservice.repository.OccupationRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class OccupationRepositoryImpl implements OccupationRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Occupation> findByHollandCode(String hollandCode) {
        String jpql = """
        SELECT o
        FROM Occupation o
        JOIN o.occupationTraits ot1
        JOIN ot1.trait t1
        """
                + (hollandCode.length() > 1 ? " JOIN o.occupationTraits ot2 JOIN ot2.trait t2" : "")
                + (hollandCode.length() > 2 ? " JOIN o.occupationTraits ot3 JOIN ot3.trait t3" : "")
                + " WHERE ot1.position = 1 AND t1.code = :c1"
                + (hollandCode.length() > 1 ? " AND ot2.position = 2 AND t2.code = :c2" : "")
                + (hollandCode.length() > 2 ? " AND ot3.position = 3 AND t3.code = :c3" : "");

        var query = entityManager.createQuery(jpql, Occupation.class);

        query.setParameter("c1", String.valueOf(hollandCode.charAt(0)));
        if(hollandCode.length() > 1) query.setParameter("c2", String.valueOf(hollandCode.charAt(1)));
        if(hollandCode.length() > 2) query.setParameter("c3", String.valueOf(hollandCode.charAt(2)));

        return query.getResultList();
    }

}
