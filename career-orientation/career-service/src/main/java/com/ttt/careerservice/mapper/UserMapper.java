package com.ttt.careerservice.mapper;

import com.ttt.careerservice.dto.UserRequestDTO;
import com.ttt.careerservice.dto.UserResponseDTO;
import com.ttt.careerservice.model.User;

import java.time.LocalDate;

public class UserMapper {
    public static UserResponseDTO toDTO(User user) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setId(user.getId());
        userResponseDTO.setFirstName(user.getFirstName());
        userResponseDTO.setLastName(user.getLastName());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setRole(user.getRole().name());
        userResponseDTO.setGender(user.getGender());
        userResponseDTO.setDob(user.getDob() != null ? user.getDob().toString() : null);
        userResponseDTO.setAvatar(user.getAvatar());
        userResponseDTO.setCreatedDate(user.getCreatedDate());

        switch (user.getRole()) {
            case STUDENT:
                if (user.getStudent() != null) userResponseDTO.setStudentId(user.getStudent().getId());
                break;
            case ADMIN:
                if (user.getAdmin() != null) userResponseDTO.setAdminId(user.getAdmin().getId());
                break;


        }
        return userResponseDTO;
    }

    public static User toModel(UserRequestDTO userRequestDTO) {
        User user = new User();
        user.setFirstName(userRequestDTO.getFirstName());
        user.setLastName(userRequestDTO.getLastName());
        user.setEmail(userRequestDTO.getEmail());
        user.setGender(userRequestDTO.getGender());
        user.setDob(LocalDate.parse(userRequestDTO.getDob()));
        return user;
    }
}
