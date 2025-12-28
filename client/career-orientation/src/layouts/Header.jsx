import React, { useContext, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Image,
  Button,
  Offcanvas,
  // Thêm NavDropdown để sử dụng trong Offcanvas (tùy chọn)
  NavDropdown, 
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import HeaderBg from "../assets/bg_header.png";
import "../styles/Header.css";
import HeaderBottom from "./HeaderBottom";
import { MyUserContext, MyDispatchContext } from "../configs/MyContext";
import { IoMenuOutline } from "react-icons/io5";

// Định nghĩa các link cho Offcanvas (tương tự như HeaderBottom)
const navLinks = [
    { path: "/majors", label: "Ngành nghề" },
    { path: "/universities", label: "Đại học" },
    { path: "/benchmark", label: "Điểm chuẩn" },
    { path: "/quizzes", label: "Trắc nghiệm - Ngành nghề" },
];

const Header = () => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  const handleLogout = () => {
    dispatch({ type: "logout" });
    setShowDropdown(false);
    navigate("/");
    handleCloseOffcanvas(); // Đóng Offcanvas sau khi đăng xuất
  };

  // Hàm điều hướng tùy chỉnh để đóng Offcanvas khi chuyển trang
  const handleNavLinkClick = (path) => {
    handleCloseOffcanvas();
    navigate(path);
  };

  return (
    <>
      <Navbar
        expand="lg"
        style={{
          backgroundImage: `url(${HeaderBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-100 px-5 border-bottom"
      >
        <Container fluid>
          {/* Nút menu 3 gạch, chỉ hiển thị trên màn hình nhỏ (d-lg-none) */}
          <Button
            variant="link"
            onClick={handleShowOffcanvas}
            className="d-lg-none p-0 me-3"
            style={{ color: "#0A2463", fontSize: "1.5rem" }}
          >
            <IoMenuOutline size={35} color="#2c64f6" />
          </Button>

          <Navbar.Brand href="/" style={{ paddingLeft: "10%" }}>
            <img
              src={Logo}
              alt="Logo"
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-between"
            style={{ paddingLeft: "16%" }}
          >
            <div
              className="d-none d-lg-block text-header fs-4 fw-bold"
              style={{ color: "#0A2463" }}
            >
              Cổng thông tin tuyển sinh Đại học Việt Nam
            </div>

            <Nav>
              {/* PHẦN ĐĂNG NHẬP TRÊN NAVBAR CHÍNH (MÀN HÌNH LỚN) */}
              {user ? (
                <Dropdown
                  show={showDropdown}
                  onToggle={(isOpen) => setShowDropdown(isOpen)}
                  align="end"
                >
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-user"
                    className="d-flex align-items-center border-0 bg-transparent"
                    style={{ boxShadow: "none" }}
                  >
                    <Image
                      src={user.avatar || "https://i.pravatar.cc/40"}
                      alt="Avatar"
                      roundedCircle
                      width="40"
                      height="40"
                      className="me-2"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow border-0">
                    <Dropdown.Item onClick={handleLogout} className="text-danger">
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Đăng xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className="text-header fw-semibold"
                    style={{ color: "#FF6B35" }}
                  >
                    Đăng Nhập
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/register"
                    className="text-header fw-semibold"
                    style={{ color: "#ad4c29ff" }}
                  >
                    Đăng Ký
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Chỉ hiển thị HeaderBottom trên màn hình lớn (d-lg-block) */}
      <div className="d-none d-lg-block">
        <HeaderBottom />
      </div>

      {/* ===================================================================
        Offcanvas Menu (Sidebar) cho thiết bị di động
        ===================================================================
      */}
      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">Menu Điều Hướng</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* 1. HIỂN THỊ TRẠNG THÁI ĐĂNG NHẬP TRONG OFFCANVAS */}
          <Nav className="flex-column border-bottom mb-3 pb-3">
            {user ? (
              // Nếu đã đăng nhập: Hiển thị avatar và tên
              <>
                <div className="d-flex align-items-center mb-3">
                    <Image
                        src={user.avatar || "https://i.pravatar.cc/40"}
                        alt="Avatar"
                        roundedCircle
                        width="50"
                        height="50"
                        className="me-3"
                    />
                    <div className="fw-bold fs-5">{user.username}</div>
                </div>
                {/* Thêm link profile (tùy chọn) */}
                <Nav.Link 
                    as={Link}
                    to="/profile"
                    onClick={() => handleNavLinkClick('/profile')}
                    className="text-header py-2"
                    style={{ color: "#0A2463" }}
                >
                    <i className="bi bi-person me-2"></i>
                    Hồ sơ cá nhân
                </Nav.Link>
                {/* Thêm link Đăng xuất */}
                <Nav.Link onClick={handleLogout} className="text-danger py-2">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Đăng xuất
                </Nav.Link>
              </>
            ) : (
              // Nếu chưa đăng nhập: Hiển thị nút Đăng nhập / Đăng ký
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  onClick={() => handleNavLinkClick('/login')}
                  className="text-header fw-semibold py-2"
                  style={{ color: "#FF6B35" }}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Đăng Nhập
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  onClick={() => handleNavLinkClick('/register')}
                  className="text-header fw-semibold py-2"
                  style={{ color: "#ad4c29ff" }}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Đăng Ký
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* 2. HIỂN THỊ CÁC LINK ĐIỀU HƯỚNG CHÍNH */}
          <Nav className="flex-column">
            {navLinks.map((link) => {
              const isActive = window.location.pathname.startsWith(link.path);
              
              return (
                <Nav.Link
                  key={link.path}
                  as={Link}
                  to={link.path}
                  onClick={() => handleNavLinkClick(link.path)} // Sử dụng hàm mới
                  className={`text-header fs-5 py-3 ${isActive ? "active" : ""}`}
                  style={{ color: isActive ? "#447ec4" : "#2a2a2a" }}
                >
                  {link.label}
                </Nav.Link>
              );
            })}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;