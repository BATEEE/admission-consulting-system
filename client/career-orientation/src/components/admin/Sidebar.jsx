import { Nav } from "react-bootstrap";
import "../../styles/Sidebar.css";
import {
  IoBarChart,
  IoChatbubbleEllipses,
  IoPersonCircle,
  IoStatsChart,
} from "react-icons/io5";
import Logo from "../../assets/Logo.png";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="sidebar d-flex flex-column vh-100 p-3 bg-light">
      <div className="sidebar-header d-flex align-items-center gap-3 mb-3 px-4 py-3">
        <img
          src={Logo}
          alt="Logo"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <div className="fw-bold" style={{ color: "#5A67BA" }}>
          E_Education
        </div>
      </div>

      <Nav className="flex-column">
        <div className="mb-4">
          <div
            className="text-uppercase text-muted small px-4 py-3"
            style={{ color: "#082431" }}
          >
            Menu
          </div>
          <Nav.Link
            as={Link}
            to="/admin/dashboards"
            className={`d-flex align-items-center gap-2 px-4 py-3 items ${isActive("/admin/dashboards") ? "active" : ""}`}
            style={{ color: "#5A67BA", fontWeight: 600 }}
          >
            <IoStatsChart size={22} /> <span>Dashboard</span>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/users"
            className={`d-flex align-items-center gap-2 px-4 py-3 items ${isActive("/admin/users") ? "active" : ""}`}
            style={{ color: "#747a87", fontWeight: 600 }}
          >
            <IoPersonCircle size={22} /> <span>Người dùng</span>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/chatbox"
            className={`d-flex align-items-center gap-2 px-4 py-3 items ${isActive("/admin/chatbox") ? "active" : ""}`}
            style={{ color: "#747a87", fontWeight: 600 }}
          >
            <IoChatbubbleEllipses size={22} /> <span>Chat box</span>
          </Nav.Link>
        </div>

        <div
          className="text-uppercase text-muted small px-4 py-3"
          style={{ color: "#082431" }}
        >
          Other
        </div>
        <Nav.Link
          href="#"
          className="d-flex align-items-center gap-2 px-4 py-3"
          style={{ color: "#5A67BA" }}
        >
          <IoStatsChart size={20} /> <span>Dashboard</span>
        </Nav.Link>
        <Nav.Link
          href="#"
          className="d-flex align-items-center gap-2 px-4 py-3"
        >
          <IoPersonCircle size={20} /> <span>Người dùng</span>
        </Nav.Link>
        <Nav.Link
          href="#"
          className="d-flex align-items-center gap-2 px-4 py-3"
        >
          <IoChatbubbleEllipses size={20} /> <span>Chat box</span>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
