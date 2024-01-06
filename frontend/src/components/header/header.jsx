import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const userRole = "admin"; // Replace with the actual role of the user

  // object for path to brand mappings
  const pathToBrandMap = {
    "/dashboard": "Dashboard",
    "/students": "Students List",
    "/accountant": "Accountant",
    "/payment": "Payment",
    "/feeStructure": "Fee Structure ",
    "/statements": "Statements",
    "/statements/seeDetails/statementDetails": "Statements",
    "/ledger": "Ledger",
    "/Profile": "Profile",
    "/logout": "Logout",
    "/feeStructure/CreateFee": "Create Fee Structure",
  };

  // now extract the dynamic value from the pathToBrandMap
  const dynamicPath = pathToBrandMap[location.pathname];

  const [showDropdown, setShowDropdown] = useState(false); // Provide an initial value

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header>
      <Navbar
        expand="md"
        collapseOnSelect
        style={{ borderRadius: "5px", background: "#224952" }}
      >
        <Container>
          <Navbar.Brand href="/" style={{ color: "white" }}>
            {dynamicPath}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav style={{ marginLeft: "90%" }}>
              {userRole === "admin" && (
                <Nav.Link href="/admin" style={{ color: "white" }}>
                  Admin
                </Nav.Link>
              )}
              {userRole === "accountant" && (
                <Nav.Link href="/accountant" style={{ color: "white" }}>
                  Accountant
                </Nav.Link>
              )}
              {userRole === "students" && (
                <Nav.Link href="/students" style={{ color: "white" }}>
                  Students
                </Nav.Link>
              )}

              <NavDropdown
                show={showDropdown}
                onToggle={toggleDropdown}
                title={<BsIcons.BsFillPersonFill style={{ color: "white" }} />}
                id="dropdown-menu"
              >
                <NavDropdown.Item as={Link} to="/Profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
