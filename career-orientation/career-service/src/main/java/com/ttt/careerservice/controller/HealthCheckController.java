package com.ttt.careerservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        try {
            Integer result = jdbcTemplate.queryForObject(
                    "SELECT 1",
                    Integer.class
            );

            return ResponseEntity.ok("OK " + result);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("DB ERROR");
        }
    }
}
