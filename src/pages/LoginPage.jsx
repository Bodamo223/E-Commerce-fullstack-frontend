import styles from "../css/Login.module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../components/store/slices/AuthSlice";

export function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      setTimeout(() => navigate("/"), 1500);
    } else {
      toast.error(result.payload);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles["login-container"]}>
      <form onSubmit={handleSubmit} className={styles["login-card"]}>
        <h1 className={styles["login-title"]}>Login</h1>

        <div className={styles["input-group"]}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles["username-input"]}
            required
          />
          <i className="fa-solid fa-user"></i>
          <label className={styles["username-label"]}>Username</label>
        </div>

        <div className={styles["input-group"]}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles["password-input"]}
            required
          />
          <i className="fa-solid fa-lock"></i>
          <label className={styles["password-label"]}>Password</label>
        </div>

        <div className={styles["login-options"]}>
          <label className="remember-me">
            <input type="checkbox" /> Remember Me
          </label>
          <Link to="#">Forgot Password?</Link>
        </div>

        <button type="submit" className={styles["login-button"]}>
          Login
        </button>
        <Link to="/register">Don't have an account?</Link>
      </form>
    </div>
  );
}
