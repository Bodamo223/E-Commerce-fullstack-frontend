import { NavLink, useLocation } from "react-router-dom";
import styles from "../css/Navbar.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/slices/AuthSlice";
import { toast } from "react-toastify";

export function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, isAdmin, authChecked } = useSelector((state) => state.Auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const cart = useSelector((s) => s.carts.cart);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className={styles["nav"]}>
        <h1 style={{ fontFamily: "Kaushan Script" }}>E-Commerce</h1>

        <ul className={styles["nav-links"]}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${styles["nav-link"]} ${styles["nav-link-active"]}`
                  : styles["nav-link"]
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? `${styles["nav-link"]} ${styles["nav-link-active"]}`
                  : styles["nav-link"]
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? `${styles["nav-link"]} ${styles["nav-link-active"]}`
                  : styles["nav-link"]
              }
            >
              About Us
            </NavLink>
          </li>
        </ul>

        <div className={styles["nav-actions"]}>
          {authChecked && isAdmin && (
            <NavLink
              to="/admin-dashboard"
              className={`${styles["nav-link"]} ${styles["desktop-only"]}`}
            >
              Dashboard
            </NavLink>
          )}

          <div className={styles["shopping-cart"]}>
            {cart.length > 0 && (
              <div className={styles["cart-length"]}>{cart.length}</div>
            )}
            <NavLink to="/cart" className={styles["cart-link"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="18" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </NavLink>
          </div>

          {authChecked && (!isAuthenticated ? (
            <NavLink
              to="/login"
              className={`${styles["login-link"]} ${styles["desktop-only"]}`}
            >
              Log in
            </NavLink>
          ) : (
            <NavLink
              onClick={async () => {
                const result = await dispatch(logout());
                if (logout.fulfilled.match(result)) {
                  toast.success(result.payload?.message);
                } else {
                  toast.error(result.payload?.message);
                }
              }}
              to="#"
              className={`${styles["login-link"]} ${styles["desktop-only"]}`}
            >
              Log out
            </NavLink>
          ))}

          <button
            className={styles["hamburger"]}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`${styles["bar"]} ${menuOpen ? styles["bar-1-open"] : ""}`}
            ></span>
            <span
              className={`${styles["bar"]} ${menuOpen ? styles["bar-2-open"] : ""}`}
            ></span>
            <span
              className={`${styles["bar"]} ${menuOpen ? styles["bar-3-open"] : ""}`}
            ></span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className={styles["mobile-overlay"]}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className={styles["mobile-menu"]}
            onClick={(e) => e.stopPropagation()}
          >
            <NavLink to="/" className={styles["mobile-link"]}>
              Home
            </NavLink>
            <NavLink to="/products" className={styles["mobile-link"]}>
              Products
            </NavLink>
            <NavLink to="/about" className={styles["mobile-link"]}>
              About Us
            </NavLink>
            {authChecked && isAdmin && (
              <NavLink to="/admin-dashboard" className={styles["mobile-link"]}>
                Dashboard
              </NavLink>
            )}
            {authChecked && (!isAuthenticated ? (
              <NavLink to="/login" className={styles["mobile-link"]}>
                Log in
              </NavLink>
            ) : (
              <button
                className={styles["mobile-logout"]}
                onClick={() => {
                  dispatch(logout());
                  setMenuOpen(false);
                }}
              >
                Log out
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
