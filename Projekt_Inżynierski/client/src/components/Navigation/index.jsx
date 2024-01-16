import styles from "./styles.module.css";
import React from "react";
import Logout from "../Logout";

import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const Navigation = () => {
  const userRole = localStorage.getItem("role");

  return (
    <Navbar className={`sticky-top ${styles.pinkNavbar}`} variant="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white">
          <img
            src={process.env.PUBLIC_URL + "/img/ctering-modified.png"}
            alt="Ctering"
            width={"120"}
            className={styles.meal_image}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/menu" className="text-white">
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="text-white">
              Koszyk
            </Nav.Link>
            <Nav.Link as={Link} to="/calc" className="text-white">
              Kalkulator BMR
            </Nav.Link>
            <Nav.Link as={Link} to="/mealsList" className="text-white">
              Lista posiłków
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-white">
              Kontakt
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white">
              O nas
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Item>
              {userRole === "Admin" && (
                <Nav.Link as={Link} to="/panel" className="text-white">
                  Admin panel
                </Nav.Link>
              )}
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/account" className="text-white">
                Konto
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Logout />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
