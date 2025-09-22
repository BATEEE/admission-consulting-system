import React, { useContext, useState } from "react";
import { Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import HeaderBg from "../assets/bg_header.png";
import "../styles/Header.css";
import HeaderBottom from "./HeaderBottom";
import { MyUserContext, MyDispatchContext } from "../configs/MyContext";

const Header = () => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "logout" });
    setShowDropdown(false);
    navigate("/");
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
              {user ? (
                // Hiển thị avatar và dropdown nếu đã đăng nhập
                <Dropdown 
                  show={showDropdown} 
                  onToggle={(isOpen) => setShowDropdown(isOpen)}
                  align="end"
                >
                  <Dropdown.Toggle 
                    variant="light" 
                    id="dropdown-user" 
                    className="d-flex align-items-center border-0 bg-transparent"
                    style={{ boxShadow: 'none' }}
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
                // Hiển thị đăng nhập/đăng ký nếu chưa đăng nhập
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

      <HeaderBottom />
    </>
  );
};

export default Header;