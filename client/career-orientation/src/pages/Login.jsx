import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Apis, { authApis, endpoints } from "../configs/Apis";
import cookie from "react-cookies";
import { MyDispatchContext } from "../configs/MyContext";
import loginImage from "../assets/login-img.png";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useContext(MyDispatchContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // Gọi API login
      const res = await Apis.post(endpoints["login"], data);

      const { token } = res.data;

      cookie.save("token", token, { path: "/" });
      localStorage.setItem("accessToken", token);

      const profileRes = await authApis().get(endpoints["profile"]);

      const userData = profileRes.data;
      console.info("User data:", userData);

      dispatch({
        type: "login",
        payload: userData,
      });

      // Lưu vào localStorage (reducer sẽ làm nhưng làm lại để chắc chắn)
      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.role === "ADMIN") {
        navigate("/admin");
      } else navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      if (err.response && err.response.status === 401) {
        setError("Sai email hoặc mật khẩu!");
      } else if (err.response && err.response.data) {
        // Xử lý response data có thể là object hoặc string
        const errorData = err.response.data;
        setError(
          typeof errorData === "object"
            ? errorData.message || JSON.stringify(errorData)
            : errorData
        );
      } else {
        setError("Có lỗi xảy ra, vui lòng thử lại!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="login-container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card login-card shadow-lg">
        <div className="row g-0">
          {/* Cột hình ảnh - ẩn trên điện thoại */}
          <div
            className={`col-md-6 login-image d-none d-md-block p-5 ${
              mounted ? "fade-in-left" : ""
            }`}
          >
            <img src={loginImage} alt="Login" className="img-fluid h-100" />
          </div>

          {/* Cột form - chiếm toàn bộ chiều rộng trên điện thoại */}
          <div className={`col-12 col-md-6 ${mounted ? "fade-in-right" : ""}`}>
            <div className="card-body p-4 p-md-5">
              <h3 className="text-center mb-4 login-title">Đăng nhập</h3>

              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    required
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 login-btn"
                  disabled={loading}
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </form>
              <p className="text-center mt-3 mb-0">
                Chưa có tài khoản?{" "}
                <Link to="/register" className="register-link">
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
