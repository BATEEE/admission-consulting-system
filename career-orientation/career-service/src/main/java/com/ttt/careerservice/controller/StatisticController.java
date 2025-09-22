package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.UserStatisticsDTO;
import com.ttt.careerservice.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/statistics")
public class StatisticController {
    private final UserService userService;

    public StatisticController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/students/by-month")
    public ResponseEntity<List<UserStatisticsDTO>> getByMonth() {
        return ResponseEntity.ok(userService.getStudentStatsByMonth());
    }

    @GetMapping("/students/by-quarter")
    public ResponseEntity<List<UserStatisticsDTO>> getByQuarter() {
        return ResponseEntity.ok(userService.getStudentStatsByQuarter());
    }

    @GetMapping("/students/by-year")
    public ResponseEntity<List<UserStatisticsDTO>> getByYear() {
        return ResponseEntity.ok(userService.getStudentStatsByYear());
    }
}
