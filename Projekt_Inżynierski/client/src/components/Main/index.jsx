import styles from "./styles.module.css";
import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation";
import Foot from "../Foot";
const Main = () => {
  return (
    <div>
      <Navigation />
      <div className={styles.main_container}>
        <h1>Ctering - Smaczne i zdrowe posiłki!</h1>
        <Link to="/menu" className={styles.checkOfferButton}>
          Sprawdź ofertę
        </Link>
        <h2><strong>Dlaczego my?</strong></h2>
        <div className={styles.content}>
        <div className={styles.imageContainer}>
            <img
              src="/img/mainPicture.png"
              alt="Food"
              width="800"
              height="510"
            />
          </div>
          <div className={styles.mainContainer}>
            <ul className={styles.customList}>
              <li>
                <strong className={styles.listHeading}>
                  Wysoka jakość posiłków
                </strong>
                <p className={styles.listDescription}>
                  Ctering oferuje wysokiej jakości posiłki przygotowywane przez
                  doświadczonych kucharzy i dietetyków.
                </p>
              </li>
              <li>
                <strong className={styles.listHeading}>
                  Wygodne funkcje na stronie internetowej
                </strong>
                <p className={styles.listDescription}>
                  Klienci mają łatwy dostęp do konta, śledzą historię zamówień i
                  edytują dane osobowe.
                </p>
              </li>
              <li>
                <strong className={styles.listHeading}>
                  Profesjonalna obsługa klienta
                </strong>
                <p className={styles.listDescription}>
                  Ctering zapewnia profesjonalną obsługę klienta, która jest
                  zawsze gotowa odpowiedzieć na pytania i pomóc w rozwiązaniu
                  problemów. Klienci mogą liczyć na wsparcie i pomoc w trakcie
                  korzystania z usług firmy.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
};

export default Main;
