package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.LoginRequestDTO;
import com.ttt.careerservice.dto.RegisterRequestDTO;
import com.ttt.careerservice.dto.UserResponseDTO;
import com.ttt.careerservice.exception.EmailAlreadyExistsException;
import com.ttt.careerservice.service.UserService;
import com.ttt.careerservice.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager,
                          UserService userService,
                          JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            // "Bearer <token>"
            String token = authHeader.substring(7);
            String email = jwtUtil.extractUsername(token);

            // Lấy user từ service hoặc repository
            UserResponseDTO user = userService.getUserByEmail(email);

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc đã hết hạn");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            String token = jwtUtil.generateToken(loginRequest.getEmail());
            return ResponseEntity.ok(new AuthResponse(token, "Đăng nhập thành công"));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai email hoặc mật khẩu!");
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Xác thực thất bại!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi hệ thống!");
        }
    }

    @PostMapping(value = "/register", consumes = "multipart/form-data")
    public ResponseEntity<?> register(@Valid @ModelAttribute RegisterRequestDTO registerRequestDTO) {
        try {
            UserResponseDTO userResponse = userService.createUser(registerRequestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Record cho login response
    public record AuthResponse(String token, String message) {}
}
