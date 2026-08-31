import { useState } from "react";
import styles from "../../css/AdminUsers.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "../../components/Pagination";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  addUser,
  deleteUser,
  editUser,
  fetchUsers,
} from "../../components/store/slices/UsersSlice";
import { useSearchParams } from "react-router-dom";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  role: "user",
  password: "",
};

const ROLE_OPTIONS = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

const Field = ({ label, name, type = "text", required, form, onChange }) => (
  <div className={styles["form-group"]}>
    <label>
      {label}
      {required}
    </label>
    <input
      className={styles["form-input"]}
      type={type}
      name={name}
      value={form[name]}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

export function AdminUsers() {
  const dispatch = useDispatch();
  const { users, totalUsers, adminUsers, regularUsers } = useSelector(
    (s) => s.users,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [searchTerm, setSearchTerm] = useState("");
  const totalPages = Math.ceil(totalUsers / 20) || 1;

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setModal("add");
  };
  const openEdit = (u) => {
    setSelected(u);
    setForm({
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      username: u.username || "",
      email: u.email || "",
      phone: u.phone || "",
      role: u.role || "",
      password: "",
    });
    setModal("edit");
  };
  console.log(form);

  const openView = (u) => {
    setSelected(u);
    setModal("view");
  };
  const openDelete = (u) => {
    setSelected(u);
    setModal("delete");
  };
  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const refetch = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  async function handleAdd() {
    const result = await dispatch(addUser(form));
    if (addUser.fulfilled.match(result)) {
      toast.success("User added successfully");
      refetch();
      closeModal();
    } else {
      toast.error(result.payload);
    }
  }

  async function handleEdit() {
    const result = await dispatch(
      editUser({ id: selected.id, credentials: form }),
    );
    if (editUser.fulfilled.match(result)) {
      toast.success("User updated successfully");
      refetch();
      closeModal();
    } else {
      toast.error(result.payload);
    }
  }

  async function handleDelete(id) {
    const result = await dispatch(deleteUser(id));
    if (deleteUser.fulfilled.match(result)) {
      toast.success("User deleted successfully");
      refetch();
      closeModal();
    } else {
      toast.error(result.payload);
    }
  }

  useEffect(() => {
    const params = {
      page: currentPage,
      search: searchTerm,
    };
    setSearchParams(params);
    dispatch(fetchUsers(params));
  }, [currentPage, searchTerm]);

  return (
    <>
      {modal && (
        <div className={styles["modal-overlay"]} onClick={closeModal}>
          <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
            {(modal === "add" || modal === "edit") && (
              <>
                <div className={styles["modal-header"]}>
                  <h3>{modal === "add" ? "Add New User" : "Edit User"}</h3>
                  <button
                    className={styles["modal-close"]}
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </div>
                <div className={styles["modal-body"]}>
                  <div className={styles["form-row"]}>
                    <Field
                      label="First Name"
                      name="firstName"
                      required
                      form={form}
                      onChange={handleChange}
                    />
                    <Field
                      label="Last Name"
                      name="lastName"
                      required
                      form={form}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles["form-row"]}>
                    <Field
                      label="Username"
                      name="username"
                      required
                      form={form}
                      onChange={handleChange}
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      required
                      form={form}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles["form-row"]}>
                    <Field
                      label="Phone"
                      name="phone"
                      required
                      form={form}
                      onChange={handleChange}
                    />
                    <div className={styles["form-group"]}>
                      <label>Role</label>
                      <select
                        className={styles["form-input"]}
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                      >
                        {ROLE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {modal === "add" && (
                    <Field
                      label="Password"
                      name="password"
                      type="password"
                      form={form}
                      onChange={handleChange}
                    />
                  )}
                </div>
                <div className={styles["modal-footer"]}>
                  <button className={styles["btn-cancel"]} onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    className={styles["btn-save"]}
                    onClick={modal === "add" ? handleAdd : handleEdit}
                  >
                    {modal === "add" ? "Add User" : "Save Changes"}
                  </button>
                </div>
              </>
            )}

            {modal === "view" && selected && (
              <>
                <div className={styles["modal-header"]}>
                  <h3>User Details</h3>
                  <button
                    className={styles["modal-close"]}
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </div>
                <div className={styles["modal-body"]}>
                  <div className={styles["view-avatar"]}>
                    {selected.image ? (
                      <img
                        src={selected.image}
                        alt="avatar"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={styles["avatar-fallback"]}
                      style={{ display: selected.image ? "none" : "flex" }}
                    >
                      {selected.firstName?.[0]?.toUpperCase()}
                      {selected.lastName?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h4>
                        {selected.firstName} {selected.lastName}
                      </h4>
                      <span className={styles["role-badge"]}>
                        {selected.role || "user"}
                      </span>
                    </div>
                  </div>
                  <div className={styles["view-grid"]}>
                    {[
                      ["ID", `#${selected.id}`],
                      ["Username", selected.username],
                      ["Email", selected.email],
                      ["Phone", selected.phone],
                    ].map(([label, value]) => (
                      <div key={label} className={styles["view-field"]}>
                        <span className={styles["view-label"]}>{label}</span>
                        <span className={styles["view-value"]}>
                          {value || "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles["modal-footer"]}>
                  <button className={styles["btn-cancel"]} onClick={closeModal}>
                    Close
                  </button>
                  <button
                    className={styles["btn-save"]}
                    onClick={() => {
                      closeModal();
                      openEdit(selected);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}

            {modal === "delete" && selected && (
              <>
                <div className={styles["modal-header"]}>
                  <h3>Delete User</h3>
                  <button
                    className={styles["modal-close"]}
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </div>
                <div
                  className={styles["modal-body"]}
                  style={{ textAlign: "center", padding: "30px 20px" }}
                >
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                    ⚠️
                  </div>
                  <p
                    style={{
                      color: "white",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Are you sure you want to delete{" "}
                    <strong>
                      {selected.firstName} {selected.lastName}
                    </strong>
                    ?
                  </p>
                  <p style={{ color: "rgb(73,76,118)", fontSize: "13px" }}>
                    This action cannot be undone.
                  </p>
                </div>
                <div className={styles["modal-footer"]}>
                  <button className={styles["btn-cancel"]} onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    className={styles["btn-delete-confirm"]}
                    onClick={() => handleDelete(selected.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <nav className={styles["adminUsers-header"]}>
        <h2 style={{ color: "white" }}>Users Management</h2>
        <span>View and manage all registered users</span>
      </nav>

      <main className={styles["adminUsers-content"]}>
        <div className={styles["stats"]}>
          <div
            className={`${styles["stats-card"]} ${styles["totalUsers-card"]}`}
          >
            <span style={{ fontWeight: "bold" }}>TOTAL USERS</span>
            <h1 style={{ color: "white" }}>{totalUsers}</h1>
            <p style={{ color: "yellowgreen" }}>Registered</p>
          </div>
          <div className={`${styles["stats-card"]} ${styles["admins-card"]}`}>
            <span style={{ fontWeight: "bold" }}>ADMINS</span>
            <h1 style={{ color: "white" }}>{adminUsers}</h1>
            <p style={{ color: "yellowgreen" }}>Full access</p>
          </div>
          <div
            className={`${styles["stats-card"]} ${styles["inActiveUsers-card"]}`}
          >
            <span style={{ fontWeight: "bold" }}>REGULAR USERS</span>
            <h1 style={{ color: "white" }}>{regularUsers}</h1>
            <p style={{ color: "yellowgreen" }}>Standard access</p>
          </div>
        </div>

        <div className={styles["users-list"]}>
          <div className={styles["users-list-header"]}>
            <h4>All Users</h4>
            <div className={styles["users-list-header-actions"]}>
              <input
                className={styles["search-input"]}
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <button className={styles["add-user-btn"]} onClick={openAdd}>
                + Add User
              </button>
            </div>
          </div>

          <div className={styles["users-stats"]}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>USERNAME</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "rgb(73,76,118)",
                      }}
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>
                        <div className={styles["user-cell"]}>
                          <div className={styles["user-img"]}>
                            {user.image && (
                              <img
                                src={user.image}
                                alt="avatar"
                                className={styles["avatar-img"]}
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            )}
                            <span
                              className={styles["avatar-initials"]}
                              style={{ display: user.image ? "none" : "flex" }}
                            >
                              {user.firstName?.[0]?.toUpperCase()}
                            </span>
                          </div>
                          {user.firstName} {user.lastName}
                        </div>
                      </td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`${styles["role-chip"]} ${styles[`role-${user.role || "user"}`]}`}
                        >
                          {(user.username === "boda" ? "owner" : user.role) || "user"}
                        </span>
                      </td>
                      <td>
                        <button
                          className={styles["view-btn"]}
                          onClick={() => openView(user)}
                        >
                          View
                        </button>
                        {
                          user.username !== "boda" &&
                          (<button
                          className={styles["edit-btn"]}
                          onClick={() => openEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles["delete-btn"]}
                          onClick={() => openDelete(user)}
                        >)}
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </main>
    </>
  );
}
