import { useState, useEffect } from "react";
import styles from "../../css/Overview.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updateProduct,
  deleteProduct,
  fetchProducts,
} from "../../components/store/slices/ProductsSlice";
import {
  deleteUser,
  editUser,
  fetchUsers,
} from "../../components/store/slices/UsersSlice";
import {
  deleteCart,
  fetchCarts,
} from "../../components/store/slices/CartsSlice";

export function Overview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, totalProducts } = useSelector((s) => s.products);
  const { users, totalUsers } = useSelector((s) => s.users);
  const { carts, totalCarts, revenue } = useSelector((s) => s.carts);

  const recentProducts = products.slice(0, 3);
  const recentUsers = users.slice(0, 3);
  const recentCarts = carts.slice(0, 3);

  const [modal, setModal] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCart, setSelectedCart] = useState(null);

  const closeModal = () => {
    setModal(null);
    setEditData({});
  };

  const getUserName = (userId) => {
    const u = users.find((u) => u.id === userId);
    return u ? `${u.firstName} ${u.lastName}` : `User #${userId}`;
  };

  const stockColor = (s) =>
    s === 0 ? "rgb(238,29,29)" : s < 5 ? "rgb(255,145,0)" : "rgb(120,201,0)";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((p) => ({ ...p, [name]: value }));
  };

  const openProductView = (p) => {
    setSelectedProduct(p);
    setModal({ type: "product", action: "view", data: p });
  };
  const openProductEdit = (p) => {
    setSelectedProduct(p);
    setModal({ type: "product", action: "edit", data: p });
    setEditData({
      title: p.title || "",
      category: p.category || "",
      price: p.price || "",
      stock: p.stock || "",
      rating: p.rating || "",
    });
  };

  const openProductDelete = (p) => {
    setSelectedProduct(p);
    setModal({ type: "product", action: "delete", data: p });
  };
  const refetch = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  async function handleEditProduct() {
    const result = await dispatch(
      updateProduct({ id: selectedProduct.id, credentials: editData }),
    );
    if (updateProduct.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      refetch();
      closeModal();
    } else {
      toast.error(result.payload);
    }
  }

  async function handleDeleteProduct(id) {
    const result = await dispatch(deleteProduct(id));
    if (deleteProduct.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      closeModal();
      refetch();
    } else {
      toast.error(result.payload?.message);
    }
  }

  const openUserView = (u) => {
    setModal({ type: "user", action: "view", data: u });
    setSelectedUser(u);
  };
  const openUserEdit = (u) => {
    setModal({ type: "user", action: "edit", data: u });
    setSelectedUser(u);
    setEditData({
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      username: u.username || "",
      email: u.email || "",
      phone: u.phone || "",
      role: u.role || "user",
    });
  };
  const openUserDelete = (u) => {
    setModal({ type: "user", action: "delete", data: u });
    setSelectedUser(u);
  };

  const openCartView = (c) => {
    setModal({ type: "cart", action: "view", data: c });
    setSelectedCart(c);
  };

  const openCartDelete = (c) => {
    setModal({ type: "cart", action: "delete", data: c });
    setSelectedCart(c);
  };

  async function handleDeleteCart(id) {
    const result = await dispatch(deleteCart(id));
    if (deleteCart.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      refetch();
      closeModal();
    } else {
      toast.error(result.payload);
    }
  }

  async function handleEditUser() {
    const result = await dispatch(
      editUser({ id: selectedUser.id, credentials: editData }),
    );
    if (editUser.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      refetch();
      closeModal();
    } else {
      toast.error(result.payload);
    }
  }

  async function handleDeleteUser(id) {
    const result = await dispatch(deleteUser(id));
    if (deleteUser.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      refetch();
      closeModal();
    } else {
      toast.error(result.payload);
    }
  }

  console.log(selectedUser);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUsers());
    dispatch(fetchCarts());
  }, []);

  return (
    <>
      {modal && (
        <div className={styles["modal-overlay"]} onClick={closeModal}>
          <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
            {modal.type === "product" && modal.action === "view" && (
              <>
                <div className={styles["modal-header"]}>
                  <h3>Product Details</h3>
                  <button
                    className={styles["modal-close"]}
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </div>
                <div className={styles["modal-body"]}>
                  {modal.data.thumbnail && (
                    <img
                      src={modal.data.thumbnail}
                      alt={modal.data.title}
                      className={styles["product-img-preview"]}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  <div className={styles["view-grid"]}>
                    {[
                      ["ID", `#${modal.data.id}`],
                      ["Title", modal.data.title],
                      ["Category", modal.data.category],
                      ["Price", `$${modal.data.price}`],
                      ["Stock", modal.data.stock],
                      ["Rating", modal.data.rating],
                    ].map(([label, value]) => (
                      <div key={label} className={styles["view-field"]}>
                        <span className={styles["view-label"]}>{label}</span>
                        <span className={styles["view-value"]}>
                          {value ?? "—"}
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
                      openProductEdit(modal.data);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}

            {modal.type === "product" && modal.action === "edit" && (
              <>
                <div className={styles["modal-header"]}>
                  <h3>Edit Product</h3>
                  <button
                    className={styles["modal-close"]}
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </div>
                <div className={styles["modal-body"]}>
                  <div className={styles["form-row"]}>
                    <div className={styles["form-group"]}>
                      <label>Title</label>
                      <input
                        className={`${styles["form-input"]}`}
                        name="title"
                        value={editData.title}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles["form-row"]}>
                    <div className={styles["form-group"]}>
                      <label>Category</label>
                      <input
                        className={styles["form-input"]}
                        name="category"
                        value={editData.category}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles["form-group"]}>
                      <label>Price ($)</label>
                      <input
                        className={`${styles["form-input"]}`}
                        name="price"
                        type="number"
                        value={editData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles["form-row"]}>
                    <div className={styles["form-group"]}>
                      <label>Stock</label>
                      <input
                        className={`${styles["form-input"]}`}
                        name="stock"
                        type="number"
                        value={editData.stock}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles["form-row"]}>
                    <div className={styles["form-group"]}>
                      <label>Rating</label>
                      <input
                        className={`${styles["form-input"]}`}
                        name="rating"
                        type="number"
                        value={editData.rating}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles["modal-footer"]}>
                  <button className={styles["btn-cancel"]} onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    className={styles["btn-save"]}
                    onClick={handleEditProduct}
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {modal.type === "product" && modal.action === "delete" && (
              <>
                <div className={styles["modal-header"]}>
                  <h3>Delete Product</h3>
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
                    Delete <strong>{modal.data.title}</strong>?
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
                    onClick={() => handleDeleteProduct(selectedProduct.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

            {modal.type === "user" && modal.action === "view" && (
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
                    {modal.data.image && (
                      <img
                        src={modal.data.image}
                        alt="avatar"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    )}
                    <div
                      className={styles["avatar-fallback"]}
                      style={{ display: modal.data.image ? "none" : "flex" }}
                    >
                      {modal.data.firstName?.[0]?.toUpperCase()}
                      {modal.data.lastName?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h4>
                        {modal.data.firstName} {modal.data.lastName}
                      </h4>
                      <span className={styles["role-badge"]}>
                        {modal.data.role || "user"}
                      </span>
                    </div>
                  </div>
                  <div className={styles["view-grid"]}>
                    {[
                      ["ID", `#${modal.data.id}`],
                      ["Username", modal.data.username],
                      ["Email", modal.data.email],
                      ["Phone", modal.data.phone],
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
                      openUserEdit(modal.data);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}

            {modal.type === "user" && modal.action === "edit" && (
              <>
                <div className={styles["modal-header"]}>
                  <h3>Edit User</h3>
                  <button
                    className={styles["modal-close"]}
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </div>
                <div className={styles["modal-body"]}>
                  <div className={styles["form-row"]}>
                    <div className={styles["form-group"]}>
                      <label>First Name </label>
                      <input
                        className={styles["form-input"]}
                        name="firstName"
                        value={editData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles["form-group"]}>
                      <label>Last Name </label>
                      <input
                        className={styles["form-input"]}
                        name="lastName"
                        value={editData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles["form-row"]}>
                    <div className={styles["form-group"]}>
                      <label>Username </label>
                      <input
                        className={styles["form-input"]}
                        name="username"
                        value={editData.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles["form-group"]}>
                      <label>Email</label>
                      <input
                        className={styles["form-input"]}
                        name="email"
                        type="email"
                        value={editData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles["form-row"]}>
                    <div className={styles["form-group"]}>
                      <label>Phone</label>
                      <input
                        className={styles["form-input"]}
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles["form-group"]}>
                      <label>Role</label>
                      <select
                        className={styles["form-input"]}
                        name="role"
                        value={editData.role}
                        onChange={handleChange}
                      >
                        <option value="">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className={styles["modal-footer"]}>
                  <button className={styles["btn-cancel"]} onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    className={styles["btn-save"]}
                    onClick={handleEditUser}
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {modal.type === "user" && modal.action === "delete" && (
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
                    Delete{" "}
                    <strong>
                      {modal.data.firstName} {modal.data.lastName}
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
                    onClick={() => handleDeleteUser(selectedUser.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

            {modal.type === "cart" && modal.action === "view" && (
              <>
                <div className={styles["modal-header"]}>
                  <div>
                    <h3>Cart #{modal.data.id}</h3>
                    <span className={styles["modal-subtitle"]}>
                      {getUserName(modal.data.user.username)}
                    </span>
                  </div>
                  <button
                    className={styles["modal-close"]}
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </div>
                <div className={styles["modal-body"]}>
                  <div className={styles["cart-summary-grid"]}>
                    {[
                      ["Products", modal.data.totalProducts],
                      ["Total Qty", modal.data.totalQuantity],
                      ["Total", `$${modal.data.total?.toFixed(2)}`],
                      [
                        "After Discount",
                        `$${modal.data.discountedTotal?.toFixed(2)}`,
                      ],
                    ].map(([label, value]) => (
                      <div key={label} className={styles["summary-card"]}>
                        <span className={styles["summary-label"]}>{label}</span>
                        <span className={styles["summary-value"]}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <h4 className={styles["products-title"]}>Products in Cart</h4>
                  <div className={styles["products-scroll"]}>
                    {modal.data.products.map((p) => (
                      <div key={p.id} className={styles["cart-product-row"]}>
                        {p.thumbnail && (
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className={styles["cart-product-thumb"]}
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        )}
                        <div className={styles["cart-product-info"]}>
                          <span className={styles["cart-product-title"]}>
                            {p.title}
                          </span>
                          <span className={styles["cart-product-meta"]}>
                            ${p.price} × {p.quantity}
                            {p.discountPercentage > 0 && (
                              <span className={styles["discount-badge"]}>
                                -10%
                              </span>
                            )}
                          </span>
                        </div>
                        <span className={styles["cart-product-total"]}>
                          ${(p.price * p.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles["modal-footer"]}>
                  <button className={styles["btn-cancel"]} onClick={closeModal}>
                    Close
                  </button>
                </div>
              </>
            )}

            {modal.type === "cart" && modal.action === "delete" && (
              <>
                <div className={styles["modal-header"]}>
                  <h3>Delete Cart</h3>
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
                    Delete <strong>Cart #{modal.data.id}</strong> for{" "}
                    <strong>{getUserName(modal.data.userId)}</strong>?
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
                    onClick={() => handleDeleteCart(selectedCart.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <nav className={styles["overview-header"]}>
        <h2 style={{ color: "white" }}>Dashboard Overview</h2>
        <span>Welcome back, Admin</span>
      </nav>

      <main className={styles["overview-content"]}>
        <div className={styles["stats"]}>
          <div className={`${styles["stats-card"]} ${styles["products-card"]}`}>
            <span style={{ fontWeight: "bold" }}>TOTAL PRODUCTS</span>
            <h1 style={{ color: "white" }}>{totalProducts || 0}</h1>
            <p style={{ color: "yellowgreen" }}>+12 this week</p>
          </div>
          <div className={`${styles["stats-card"]} ${styles["users-card"]}`}>
            <span style={{ fontWeight: "bold" }}>TOTAL USERS</span>
            <h1 style={{ color: "white" }}>{totalUsers || 0}</h1>
            <p style={{ color: "yellowgreen" }}>+5 this week</p>
          </div>
          <div className={`${styles["stats-card"]} ${styles["carts-card"]}`}>
            <span style={{ fontWeight: "bold" }}>TOTAL CARTS</span>
            <h1 style={{ color: "white" }}>{totalCarts || 0}</h1>
            <p style={{ color: "yellowgreen" }}>+3 today</p>
          </div>
          <div className={`${styles["stats-card"]} ${styles["revenue-card"]}`}>
            <span style={{ fontWeight: "bold" }}>REVENUE</span>
            <h1 style={{ color: "white" }}>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(revenue) || 0}
            </h1>
            <p style={{ color: "yellowgreen" }}>+8% this month</p>
          </div>
        </div>

        <div className={styles["recents"]}>
          <div className={styles["recent-products"]}>
            <div className={styles["recent-header"]}>
              <h4>Recent Products</h4>
              <button
                className={styles["view-all-btn"]}
                onClick={() => navigate("products")}
              >
                View all
              </button>
            </div>
            <div className={styles["recent-table-wrapper"]}>
              <table className={styles["recent-table"]}>
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>{product.category}</td>
                      <td>${product.price}</td>
                      <td style={{ color: stockColor(product.stock) }}>
                        {product.stock} left
                      </td>
                      <td style={{ display: "flex", gap: "10px" }}>
                        <button
                          className={styles["action-view"]}
                          onClick={() => openProductView(product)}
                        >
                          View
                        </button>
                        <button
                          className={styles["action-edit"]}
                          onClick={() => openProductEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles["action-delete"]}
                          onClick={() => openProductDelete(product)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles["recent-users"]}>
            <div className={styles["recent-header"]}>
              <h4>Recent Users</h4>
              <button
                className={styles["view-all-btn"]}
                onClick={() => navigate("users")}
              >
                View all
              </button>
            </div>
            <div className={styles["users-list"]}>
              {recentUsers.map((user) => (
                <div className={styles["user-row"]} key={user.id}>
                  <div className={styles["user-left"]}>
                    <div className={styles["user-avatar"]}>
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
                        {user.username[0].toUpperCase()}
                      </span>
                    </div>
                    <div className={styles["user-info"]}>
                      <h4>{user.username}</h4>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className={styles["user-right"]}>
                    <button
                      className={styles["action-view"]}
                      onClick={() => openUserView(user)}
                    >
                      View
                    </button>
                    <button
                      className={styles["action-edit"]}
                      onClick={() => openUserEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles["action-delete"]}
                      onClick={() => openUserDelete(user)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles["recent-carts"]}>
            <div className={styles["recent-header"]}>
              <h4>Recent Carts</h4>
              <button
                className={styles["view-all-btn"]}
                onClick={() => navigate("carts")}
              >
                View all
              </button>
            </div>
            <div className={styles["carts-list"]}>
              {recentCarts.map((cart) => (
                <div className={styles["cart-row"]} key={cart.id}>
                  <div className={styles["cart-left"]}>
                    <h4>Cart #{cart.id}</h4>
                    <p>
                      {cart.user.firstName} {cart.user.lastName}
                    </p>
                  </div>
                  <div className={styles["cart-right"]}>
                    <span className={styles["cart-revenue"]}>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(
                        cart.products.reduce((acc, product) => {
                          return product.discountPercentage > 0
                            ? Number((acc + product.discountedTotal).toFixed(2))
                            : Number((acc + product.total).toFixed(2));
                        }, 0),
                      )}
                    </span>
                    <button
                      className={styles["action-view"]}
                      onClick={() => openCartView(cart)}
                    >
                      View
                    </button>

                    <button
                      className={styles["action-delete"]}
                      onClick={() => openCartDelete(cart)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
