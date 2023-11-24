import React, { useState, useRef  } from "react";
import Navigation from "../Navigation";
import Foot from "../Foot";
import styles from "./styles.module.css";

const Calc = () => {
    const [gender, setGender] = useState("male");
    const [activityLevel, setActivityLevel] = useState(1.2);
    const [goal, setGoal] = useState("maintain");
    const [bmr, setBMR] = useState(0);
    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const initialErrors = {
        age: '',
        weight: '',
        height: '',
        // Dodaj inne pola do przechowywania błędów
      };
    const [form, setForm] = useState({ age: 0, weight: 0, height: 0 });
    //const [form, setForm] = useState({ age: '', weight: '', height: '' });
    const [errors, setErrors] = useState(initialErrors);
    const elementRef = useRef(null);

    const scrollToElement = () => {
        if (elementRef.current !== null) {
            elementRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...initialErrors };
    
        // Walidacja pól
        if (form.age <= 10 || form.age >= 120) {
          newErrors.age = 'Wprowadź poprawny wiek (10-120)';
          valid = false;
        }
        if (form.weight <= 30 || form.weight >= 200) {
          newErrors.weight = 'Wprowadź poprawną wagę';
          valid = false;
        }
        if (form.height <= 90 || form.height >= 250) {
          newErrors.height = 'Wprowadź poprawny wzrost';
          valid = false;
        }
    
        // Ustawianie nowych błędów
        setErrors(newErrors);
    
        return valid;
      };
    
    const calculateBMR = () => {
        let bmrResult = 0;
        const { weight, height, age } = form;
        if (gender === "male") {
            bmrResult = 66 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
        } else {
            bmrResult = 655 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
        }
        const activityFactor = activityLevel; 

        if (goal === "lose") {
            bmrResult *= 0.8;
        } else if (goal === "gain") {
            bmrResult *= 1.2;
        }

        bmrResult *= activityFactor;
        setBMR(bmrResult.toFixed(0));

        setProtein((bmrResult * 0.15 / 4).toFixed(0)); 
        setCarbs((bmrResult * 0.55 / 4).toFixed(0)); 
        setFat((bmrResult * 0.3 / 9).toFixed(0));
    };

    

    const handleSubmit = () => {
    const isValid = validateForm();
    
    if (isValid) {
      calculateBMR();
      scrollToElement();
    }else{
        setBMR(0);
    }
  };
    

    return (
        <div>
            <Navigation />
            <div className={styles.main_container}>
                <h1>Kalkulator BMR</h1>
                <div className={styles.form_container}>
                <label>Waga (kg)</label>
                    <input
                        type="number"
                        value={form.weight}
                        onChange={(e) => setForm({ ...form, weight: parseInt(e.target.value) })}
                    />
                    {errors.weight && <p>{errors.weight}</p>}

                    <label>Wzrost (cm)</label>
                    <input
                        type="number"
                        value={form.height}
                        onChange={(e) => setForm({ ...form, height: parseInt(e.target.value) })}
                    />
                    {errors.height && <p>{errors.height}</p>}

                    <label>Wiek</label>
                    <input
                        type="number"
                        value={form.age}
                        onChange={(e) => setForm({ ...form, age: parseInt(e.target.value) })}
                    />
                    {errors.age && <p>{errors.age}</p>}

                    <label>Płeć</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="male">Mężczyzna</option>
                        <option value="female">Kobieta</option>
                    </select>
                    <label>Stopień aktywności</label>
                    <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                        <option value={1.2}>Mała aktywność</option>
                        <option value={1.375}>Lekka aktywność</option>
                        <option value={1.55}>Średnia aktywność</option>
                        <option value={1.725}>Wysoka aktywność</option>
                        <option value={1.9}>Bardzo wysoka aktywność</option>
                    </select>

                    <label>Cel</label>
                    <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                        <option value="maintain">Utrzymanie wagi</option>
                        <option value="lose">Schudnięcie</option>
                        <option value="gain">Zwiększenie masy ciała</option>
                    </select>
                    <button ref={elementRef} onClick={() => {
                        handleSubmit();
                        //scrollToElement();
                        }}>
                        Oblicz
                    </button>
                </div>
                {bmr > 0 && <p className={styles.result} >Twoje BMR wynosi: {bmr}</p>}
                {bmr > 0 && <div className={styles.macros}>
                    <h2>Makroskładniki:</h2>
                    <p>Białko: {protein}g ({(bmr > 0 ? ((protein * 4 / bmr) * 100).toFixed(1) : 0)}%)</p>
                    <p>Węglowodany: {carbs}g ({(bmr > 0 ? ((carbs * 4 / bmr) * 100).toFixed(1) : 0)}%)</p>
                    <p>Tłuszcze: {fat}g ({(bmr > 0 ? ((fat * 9 / bmr) * 100).toFixed(1) : 0)}%)</p>
                </div>}
            </div>
            <Foot />
        </div>
    );
};

export default Calc;
