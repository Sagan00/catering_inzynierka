import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.css";

const Foot = () => {
  return (
    <Container fluid className={styles.content}>
      <Row>
        <Col xs={12} md={3} lg={3} className={styles.column}>
          <div className={styles.link_grp}>
            <Link to="/" className={styles.link_elem}>
              Ctering
            </Link>
            <Link to="/menu" className={styles.link_elem}>
              Menu
            </Link>
            <Link to="/cart" className={styles.link_elem}>
              Koszyk
            </Link>
            <Link to="/calc" className={styles.link_elem}>
              Kalkulator BMR
            </Link>
            <Link to="/mealsList" className={styles.link_elem}>
              Lista posiłków
            </Link>
            <Link to="/contact" className={styles.link_elem}>
              Kontakt
            </Link>
            <Link to="/about" className={styles.link_elem}>
              O nas
            </Link>
          </div>
        </Col>
        <Col xs={12} md={3} lg={3} className={styles.column}>
          <div className={styles.link_grp}>
            <div className={styles.link_elem}>Adres:</div>
            <div>Sielankowa 17</div>
            <div>Lublin 20-802</div>
          </div>
        </Col>
        <Col xs={12} md={3} lg={3} className={styles.column}>
          <div className={styles.link_grp}>
            <div className={styles.link_elem}>Kontakt:</div>
            <div>Email: ctering@gmail.com</div>
            <div>Telefon: 555422123</div>
          </div>
        </Col>
        <Col xs={12} md={3} lg={3} className={styles.column}>
          <div className={styles.link_grp}>
            <div>2023 &copy; CTERING</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Foot;
