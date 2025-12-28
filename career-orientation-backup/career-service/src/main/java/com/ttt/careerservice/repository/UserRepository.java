package com.ttt.careerservice.repository;

import com.ttt.careerservice.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email, Integer id);
    Optional<User> findByEmail(String email);
    Page<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName, String lastName, Pageable pageable);

    // Thống kê theo tháng trong 2 năm gần nhất
    @Query(value = """
            SELECT YEAR(created_date) AS year, MONTH(created_date) AS month, COUNT(*) AS count
            FROM users
            WHERE role = 'STUDENT' AND YEAR(created_date) >= YEAR(CURDATE()) - 1
            GROUP BY YEAR(created_date), MONTH(created_date)
            ORDER BY YEAR(created_date), MONTH(created_date)
            """, nativeQuery = true)
    List<Object[]> countStudentsByMonthAndYear();

    // Thống kê theo quý trong 2 năm gần nhất
    @Query(value = """
            SELECT YEAR(created_date) AS year, QUARTER(created_date) AS quarter, COUNT(*) AS count
            FROM users
            WHERE role = 'STUDENT' AND YEAR(created_date) >= YEAR(CURDATE()) - 1
            GROUP BY YEAR(created_date), QUARTER(created_date)
            ORDER BY YEAR(created_date), QUARTER(created_date)
            """, nativeQuery = true)
    List<Object[]> countStudentsByQuarterAndYear();

    // Thống kê theo năm (2 năm gần nhất)
    @Query(value = """
            SELECT YEAR(created_date) AS year, COUNT(*) AS count
            FROM users
            WHERE role = 'STUDENT' AND YEAR(created_date) >= YEAR(CURDATE()) - 1
            GROUP BY YEAR(created_date)
            ORDER BY YEAR(created_date)
            """, nativeQuery = true)
    List<Object[]> countStudentsByYear();

}
