import styles from "../../css/Footer.module.css";

export function Footer() {
  return (
    <>
      <footer className={styles["footer-section"]}>
        <div className={styles["footer-data"]}>
          <h2 className={styles["footer-logo"]}>E-Commerce</h2>

          <p className={styles["copyright"]}>
            Copyright © 2021 <strong>E-Commerce</strong> All rights reserved
          </p>
        </div>

        <div className={styles["contact-info"]}>
          <div className={styles["contact-item"]}>
            <i className="fas fa-map-marker-alt" />
            <p>
              Egypt
              <br />
              <strong>Alex</strong>
            </p>
          </div>
          <div className={styles["contact-item"]}>
            <i className="fas fa-phone" />
            <p>+2012******16</p>
          </div>
          <div className={styles["contact-item"]}>
            <i className="fas fa-envelope" />
            <p className={styles["email"]}>bodamo223@gmail.com</p>
          </div>
        </div>

        <div className={styles["about-company"]}>
          <h3>About the company</h3>
          <p>
            At E-Commerce, we blend quality with simplicity to deliver the
            latest trends and everyday essentials directly to your door.
          </p>
          <div className={styles["social-icons"]}>
            <i className="fab fa-facebook-f" />
            <i className="fab fa-instagram" />
            <i className="fab fa-linkedin-in" />
            <i className="fab fa-twitter" />
            <i className="fab fa-youtube" />
          </div>
        </div>
      </footer>
    </>
  );
}
