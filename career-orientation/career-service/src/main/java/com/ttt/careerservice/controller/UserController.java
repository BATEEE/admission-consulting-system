package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.UserRequestDTO;
import com.ttt.careerservice.dto.UserResponseDTO;
import com.ttt.careerservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Map<String, Object> getUsers(
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        Page<UserResponseDTO> usersPage = userService.getUsers(q, page, size, sortField, sortDir);

        Map<String, Object> response = new HashMap<>();
        response.put("content", usersPage.getContent());
        response.put("pageNumber", usersPage.getNumber());
        response.put("pageSize", usersPage.getSize());
        response.put("totalElements", usersPage.getTotalElements());
        response.put("totalPages", usersPage.getTotalPages());
        response.put("last", usersPage.isLast());

        return response;
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable Integer id,
            @Valid @ModelAttribute UserRequestDTO userRequestDTO) {

        UserResponseDTO userResponseDTO = userService.updateUser(id, userRequestDTO);
        return ResponseEntity.ok(userResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
