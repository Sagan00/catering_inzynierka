import styles from "./styles.module.css";
import React from "react";
import Navigation from "../Navigation";
import Foot from "../Foot";
const About = () => {
  return (
    <div>
      <Navigation />
      <div className={styles.main_container}>
        <div className={styles.content}>
          <div className={styles.aboutContainer}>
            <h2>O nas</h2>
            <p className={styles.aboutText}>
              Ctering to firma cateringowa, która oferuje wysokiej jakości
              posiłki dostosowane do indywidualnych potrzeb i preferencji
              klientów. Naszym celem jest zapewnienie zdrowych i smacznych dań,
              które pomogą osiągnąć i utrzymać optymalną formę oraz dobrą
              kondycję. Oferujemy szeroki wybór diet dostosowanych do różnych
              potrzeb, takich jak dieta wegetariańska, wegańska, bezglutenowa i
              niskokaloryczna. Nasz zespół doświadczonych dietetyków dba o to,
              aby każda dieta była zbilansowana i dostarczała wszystkich
              potrzebnych substancji odżywczych. Ctering to nie tylko smaczne
              posiłki i wygodne funkcje na stronie internetowej, ale również
              profesjonalna obsługa klienta. Zapraszamy do skorzystania z
              naszych usług cateringowych i odkrycia zdrowych posiłków dla
              ciebie i twojego zdrowia!
            </p>
          </div>
          <div className={styles.imageContainer}>
            <img
              src="/img/aboutPicture.png"
              alt="Food"
              width="600"
              height="510"
            />
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
};
export default About;
