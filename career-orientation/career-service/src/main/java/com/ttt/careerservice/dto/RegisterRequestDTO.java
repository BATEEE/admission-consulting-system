package com.ttt.careerservice.dto;

import com.ttt.careerservice.enums.Role;
import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

public class RegisterRequestDTO {
    @NotBlank(message = "Họ không được để trống")
    @Size(max = 100, message = "Họ không được vượt quá 100 ký tự")
    private String firstName;

    @Size(max = 100, message = "Tên không được vượt quá 100 ký tự")
    private String lastName;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 6, message = "Mật khẩu phải có ít nhất 6 ký tự")
    private String password;

    @NotNull(message = "Vai trò không được để trống")
    private Role role;

    private Boolean gender;

    @NotBlank(message = "Ngày sinh không được để trống")
    private String dob;

    private MultipartFile avatar;

    public MultipartFile getAvatar() {
        return avatar;
    }
    public void setAvatar(MultipartFile avatar) {
        this.avatar = avatar;
    }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public Boolean getGender() { return gender; }
    public void setGender(Boolean gender) { this.gender = gender; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }
}