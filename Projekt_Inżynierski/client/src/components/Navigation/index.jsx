import styles from "./styles.module.css";
import React from "react";
import Logout from "../Logout";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar className={styles.pinkNavbar} bg="pink" variant="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white">
        <img
                    src={process.env.PUBLIC_URL + "/img/ctering-modified.png"}
                    alt="Ctering"
                    width={'120'}
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
            <Nav.Link as={Link} to="/about" className="text-white">
              O nas
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link as={Link} to="/edituser" className="text-white">
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
