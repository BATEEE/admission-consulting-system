import React, { useContext, useState } from "react";
import { Container, Navbar, Nav, Dropdown, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminHeader.css";
import { MyDispatchContext, MyUserContext } from "../../configs/MyContext";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);

  const handleLogout = () => {
    dispatch({ type: "logout" }); 
    navigate("/");
  };

  return (
    <Navbar bg="white" expand="lg" className="admin-header shadow-sm">
      <Container fluid>
        <Navbar.Brand href="#home" className="fw-bold text-primary">
          Admin Dashboard
        </Navbar.Brand>
        
        <Nav className="ms-auto">
          <Dropdown 
            show={showDropdown} 
            onToggle={(isOpen) => setShowDropdown(isOpen)}
            align="end"
          >
            <Dropdown.Toggle variant="light" id="dropdown-user" className="d-flex align-items-center border-0">
              <Image
                src={user?.avatar || "https://via.placeholder.com/40"}
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
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;