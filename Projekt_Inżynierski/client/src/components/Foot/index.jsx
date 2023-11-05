import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./styles.module.css";

const Foot = () => {
  return (
    <Container fluid className={styles.content}>
      <Row className="d-flex">
        <Col xs={12} md={4} lg={4}>
          <div className={`${styles.link_grp} ${styles.link_copy}`}>
            <div>2023 &copy; CTERING</div>
            <div>kontakt@ctering.pl</div>
          </div>
        </Col>
        <Col xs={6} md={4} lg={4}>
          <div className={styles.link_grp}>
            <Link to="/" className={styles.link_elem}>Ctering</Link>
            <Link to="/menu" className={styles.link_elem}>Menu</Link>
            <Link to="/cart" className={styles.link_elem}>Koszyk</Link>
            <Link to="/calc" className={styles.link_elem}>Kalkulator BMR</Link>
            <Link to="/about" className={styles.link_elem}>O nas</Link>
          </div>
        </Col>
        <Col xs={6} md={4} lg={4}>
          <div className={styles.link_grp}>
            <Link to="/" className={styles.link_elem}>Ctering</Link>
            <Link to="/about" className={styles.link_elem}>Menu</Link>
            <Link to="/about" className={styles.link_elem}>Koszyk</Link>
            <Link to="/about" className={styles.link_elem}>Kalkulator BMR</Link>
            <Link to="/about" className={styles.link_elem}>O nas</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Foot;
