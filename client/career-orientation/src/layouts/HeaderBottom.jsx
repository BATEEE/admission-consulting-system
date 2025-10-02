import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/Header.css";

const navLinks = [
  { path: "/majors", label: "Ngành nghề" },
  { path: "/universities", label: "Đại học" },
  { path: "/benchmark", label: "Điểm chuẩn" },
  { path: "/quizzes", label: "Trắc nghiệm - Ngành nghề" },
];

const HeaderBottom = () => {
  const location = useLocation();

  return (
    <Navbar
      expand="lg"
      className="shadow-sm w-100 px-5 d-flex justify-content-center"
      style={{ paddingBlock: 0 }}
    >
      <Container fluid>
        <Navbar.Collapse id="bottom-navbar" className="justify-content-center">
          <Nav>
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Nav.Link
                  key={link.path}
                  as={Link}
                  to={link.path}
                  className={`text-header fw-semibold title ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderBottom;