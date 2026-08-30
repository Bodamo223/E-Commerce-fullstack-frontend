import styles from "../../css/Dashboard.module.css";
import { NavLink, Outlet } from "react-router-dom";

export function DashboardPage() {
  return (
    <>
      <div className={styles["dashboard-container"]}>
        <aside className={styles["sidebar"]}>
          <div className={styles["sidebar-header"]}>
            <span>ADMIN PANEL</span>
            <h3>E-Commerce</h3>
          </div>
          <ul className={styles["sidebar-links"]}>
            <li>
              <NavLink
                to=""
                style={{ display: "block", width: "100%" }}
                className={({ isActive }) =>
                  isActive
                    ? `${styles["side-link"]} ${styles["side-link-active"]}`
                    : `${styles["side-link"]}`
                }
                end
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="products"
                style={{ display: "block", width: "100%" }}
                className={({ isActive }) =>
                  isActive
                    ? `${styles["side-link"]} ${styles["side-link-active"]}`
                    : `${styles["side-link"]}`
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="users"
                style={{ display: "block", width: "100%" }}
                className={({ isActive }) =>
                  isActive
                    ? `${styles["side-link"]} ${styles["side-link-active"]}`
                    : `${styles["side-link"]}`
                }
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="carts"
                style={{ display: "block", width: "100%" }}
                className={({ isActive }) =>
                  isActive
                    ? `${styles["side-link"]} ${styles["side-link-active"]}`
                    : `${styles["side-link"]}`
                }
              >
                Carts
              </NavLink>
            </li>
          </ul>
        </aside>
        <div className={styles["dashboard-content"]}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
