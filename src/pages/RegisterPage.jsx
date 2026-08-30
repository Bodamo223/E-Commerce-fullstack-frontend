import { Link, useNavigate } from "react-router-dom";
import styles from "../css/Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { register } from "../components/store/slices/AuthSlice";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await dispatch(register(formData));
    if (register.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      setTimeout(() => navigate("/login"), 1500);
    } else {
      toast.error(result.payload);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className={styles["register-container"]}>
        <form onSubmit={handleSubmit} className={styles["register-card"]}>
          <h1 className={styles["register-title"]}>Register</h1>

          <div className={styles["input-group"]}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={styles["username-input"]}
              placeholder="..."
              required
            />
            <i className="fa-solid fa-user"></i>
            <label className={styles["username-label"]}>Username</label>
          </div>

          <div className={styles["input-group"]}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={styles["firstName-input"]}
              placeholder=" "
              required
            />
            <i className="fa-solid fa-address-card"></i>
            <label className={styles["firstName-label"]}>First Name</label>
          </div>

          <div className={styles["input-group"]}>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={styles["lastName-input"]}
              placeholder=" "
              required
            />
            <i className="fa-solid fa-users"></i>
            <label className={styles["username-label"]}>Last Name</label>
          </div>

          <div className={styles["input-group"]}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles["email-input"]}
              placeholder=" "
              required
            />
            <i className="fa-solid fa-envelope"></i>
            <label className={styles["email-label"]}>Email</label>
          </div>

          <div className={styles["input-group"]}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles["password-input"]}
              placeholder=" "
              required
            />
            <i className="fa-solid fa-lock"></i>
            <label className={styles["password-label"]}>Password</label>
          </div>

          <div className={styles["input-group"]}>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles["phone-input"]}
              placeholder=" "
              required
            />
            <i className="fa-solid fa-phone"></i>
            <label className={styles["password-label"]}>Phone</label>
          </div>

          <button type="submit" className={styles["register-button"]}>
            Register
          </button>
        </form>
      </div>
    </>
  );
}
