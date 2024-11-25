import { NavLink } from "react-router-dom";
import styles from "./ErrorPage.module.css"; // Import CSS module for ErrorPage styles

export default function ErrorPage() {
  return (
    <main className={styles.errorPage}>
      <h1 className={styles.title}>Error Occurred!</h1>
      <p className={styles.message}>We can't serve you right now</p>
      <p className={styles.message}>Please visit later</p>
      <p className={styles.message}>Sorry for inconvenience</p>
      <NavLink to="/" className={styles.link}>
        Return to Dashboard
      </NavLink>
      
    </main>
    
  );
}
