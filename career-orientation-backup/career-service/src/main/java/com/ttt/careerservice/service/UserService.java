package com.ttt.careerservice.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ttt.careerservice.dto.RegisterRequestDTO;
import com.ttt.careerservice.dto.UserRequestDTO;
import com.ttt.careerservice.dto.UserResponseDTO;
import com.ttt.careerservice.dto.UserStatisticsDTO;
import com.ttt.careerservice.enums.Role;
import com.ttt.careerservice.exception.EmailAlreadyExistsException;
import com.ttt.careerservice.exception.ResourceNotFoundException;
import com.ttt.careerservice.mapper.UserMapper;
import com.ttt.careerservice.model.Admin;
import com.ttt.careerservice.model.Student;
import com.ttt.careerservice.model.User;
import com.ttt.careerservice.repository.AdminRepository;
import com.ttt.careerservice.repository.StudentRepository;
import com.ttt.careerservice.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Cloudinary cloudinary;
    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, Cloudinary cloudinary, StudentRepository studentRepository, AdminRepository adminRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.cloudinary = cloudinary;
        this.studentRepository = studentRepository;
        this.adminRepository = adminRepository;
    }

    public Page<UserResponseDTO> getUsers(String q, int page, int size, String sortField, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortField).descending()
                : Sort.by(sortField).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<User> usersPage;
        if (q == null || q.isBlank()) {
            usersPage = userRepository.findAll(pageable);
        } else {
            usersPage = userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(q, q, pageable);
        }

        return usersPage.map(UserMapper::toDTO);
    }

    public UserResponseDTO createUser(RegisterRequestDTO registerRequestDTO) {
        if (userRepository.existsByEmail(registerRequestDTO.getEmail())) {
            throw new EmailAlreadyExistsException("Email đã tồn tại: " + registerRequestDTO.getEmail());
        }

        User user = new User();
        user.setFirstName(registerRequestDTO.getFirstName());
        user.setLastName(registerRequestDTO.getLastName());
        user.setEmail(registerRequestDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        user.setRole(registerRequestDTO.getRole());
        user.setGender(registerRequestDTO.getGender());
        user.setDob(LocalDate.parse(registerRequestDTO.getDob()));

        MultipartFile file = registerRequestDTO.getAvatar();
        if (file != null && !file.isEmpty()) {
            try {
                Map uploadResult = cloudinary.uploader().upload(
                        file.getBytes(),
                        ObjectUtils.asMap("folder", "user_avatars")
                );
                user.setAvatar((String) uploadResult.get("secure_url"));
            } catch (IOException e) {
                throw new RuntimeException("Lỗi khi upload ảnh lên Cloudinary", e);
            }
        }

        // Lưu user trước
        User savedUser = userRepository.save(user);

        // Tạo role tương ứng
        if (savedUser.getRole() == Role.STUDENT) {
            Student student = new Student();
            student.setUser(savedUser);
            studentRepository.save(student);
            savedUser.setStudent(student);
        } else if (savedUser.getRole() == Role.ADMIN) {
            Admin admin = new Admin();
            admin.setUser(savedUser);
            adminRepository.save(admin);
            savedUser.setAdmin(admin);
        }

        return UserMapper.toDTO(savedUser);
    }

    public UserResponseDTO updateUser(Integer id, UserRequestDTO userRequestDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại với ID: " + id));

        if (userRepository.existsByEmailAndIdNot(userRequestDTO.getEmail(), id)) {
            throw new EmailAlreadyExistsException("Tài khoản với email này đã tồn tại: " + userRequestDTO.getEmail());
        }

        user.setFirstName(userRequestDTO.getFirstName());
        user.setLastName(userRequestDTO.getLastName());
        user.setEmail(userRequestDTO.getEmail());
        user.setGender(userRequestDTO.getGender());
        user.setDob(LocalDate.parse(userRequestDTO.getDob()));

        MultipartFile file = userRequestDTO.getAvatar();
        if (file != null && !file.isEmpty()) {
            try {
                Map uploadResult = cloudinary.uploader().upload(
                        file.getBytes(),
                        ObjectUtils.asMap("folder", "user_avatars")
                );
                user.setAvatar((String) uploadResult.get("secure_url"));
            } catch (IOException e) {
                throw new RuntimeException("Lỗi khi upload ảnh lên Cloudinary", e);
            }
        }

        return UserMapper.toDTO(userRepository.save(user));
    }

    public void deleteUser(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Người dùng không tồn tại với ID: " + id);
        }
        userRepository.deleteById(id);
    }

    public UserResponseDTO getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(UserMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    public List<UserStatisticsDTO> getStudentStatsByMonth() {
        return userRepository.countStudentsByMonthAndYear().stream()
                .map(r -> new UserStatisticsDTO(
                        ((Number) r[0]).intValue(), // year
                        ((Number) r[1]).intValue(), // month
                        null,                        // quarter
                        ((Number) r[2]).longValue() // count
                ))
                .collect(Collectors.toList());
    }

    public List<UserStatisticsDTO> getStudentStatsByQuarter() {
        return userRepository.countStudentsByQuarterAndYear().stream()
                .map(r -> new UserStatisticsDTO(
                        ((Number) r[0]).intValue(), // year
                        null,
                        ((Number) r[1]).intValue(), // quarter
                        ((Number) r[2]).longValue() // count
                ))
                .collect(Collectors.toList());
    }

    public List<UserStatisticsDTO> getStudentStatsByYear() {
        return userRepository.countStudentsByYear().stream()
                .map(r -> new UserStatisticsDTO(
                        ((Number) r[0]).intValue(), // year
                        null,
                        null,
                        ((Number) r[1]).longValue() // count
                ))
                .collect(Collectors.toList());
    }
}
