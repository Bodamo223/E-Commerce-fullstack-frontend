import styles from "../../css/Hero.module.css";
import { Link } from "react-router-dom";
export function Hero() {
  return (
    <section className={styles["hero-section"]}>
      <div className={styles["hero-content"]}>
        <p className={styles["hero-badge"]}>LIMITED EDITION RELEASE</p>
        <h1 className={styles["hero-title"]}>
          Walk Into
          <br />
          <span>The Future</span>
        </h1>
        <p className={styles["hero-description"]}>
          A dynamic e-commerce platform designed to deliver a seamless and
          efficient shopping experience with intuitive navigation and detailed
          product insights.
        </p>
        <div className={styles["hero-actions"]}>
          <Link className={styles["primary-btn"]} to="/products">
            Explore Our Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
