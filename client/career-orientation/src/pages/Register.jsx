import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";
import Apis, { endpoints } from "../configs/Apis";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    gender: true,
    dob: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "radio") {
      setFormData({ ...formData, [name]: value === "true" });
    } else if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      console.log("Register payload (FormData):", [...data.entries()]);

      const res = await Apis.post(endpoints["register"], data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Register success:", res.data);
      navigate("/login");
    } catch (err) {
      console.error("Register failed:", err);
      setError(err.response?.data || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card register-card shadow-lg">
        <div className="card-body p-4 p-md-5">
          <h3 className="text-center mb-4 register-title">Đăng ký</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Họ</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tên</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Vai trò</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Chọn vai trò</option>
                <option value="STUDENT">Học sinh/Người dùng</option>
                <option value="TEACHER">Giáo viên</option>
                <option value="ADMIN">Quản trị viên</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label me-3">Giới tính:</label>
              <div>
                <label className="me-3">
                  <input
                    type="radio"
                    name="gender"
                    value="true"
                    checked={formData.gender === true}
                    onChange={handleChange}
                  />{" "}
                  Nam
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="false"
                    checked={formData.gender === false}
                    onChange={handleChange}
                  />{" "}
                  Nữ
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Ngày sinh</label>
              <input
                type="date"
                name="dob"
                className="form-control"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Ảnh đại diện</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {avatarPreview && (
              <div className="text-center mb-3">
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 register-btn"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Đã có tài khoản?{" "}
            <Link to="/login" className="login-link">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
