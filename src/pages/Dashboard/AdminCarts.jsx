import { useState, useMemo } from "react";
import styles from "../../css/AdminCarts.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "../../components/Pagination";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  deleteCart,
  fetchCarts,
} from "../../components/store/slices/CartsSlice";

export function AdminCarts() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { carts, totalCarts, totalItems, revenue, avgCartValue } = useSelector(
    (s) => s.carts,
  );
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalCarts / 20);

  const openView = (c) => {
    setSelected(c);
    setModal("view");
  };
  const openDelete = (c) => {
    setSelected(c);
    setModal("delete");
  };
  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const refetch = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  async function handleDelete(id) {
    const result = await dispatch(deleteCart(id));
    if (deleteCart.fulfilled.match(result)) {
      toast.success("Cart deleted successfully");
      refetch();
      closeModal();
    } else {
      toast.error("Failed to delete cart");
    }
  }

  useEffect(() => {
    const params = {
      page: currentPage,
      search: searchTerm,
    };
    setSearchParams(params);
    dispatch(fetchCarts(params));
  }, [currentPage, searchTerm]);

  console.log(carts);

  return (
    <>
      {modal && (
        <div className={styles["modal-overlay"]} onClick={closeModal}>
          <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
            {modal === "view" && selected && (
              <>
                <div className={styles["modal-header"]}>
                  <div>
                    <h3>Cart #{selected.id}</h3>
                    <span className={styles["modal-subtitle"]}>
                      {selected.user.username}
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
                      ["Products", selected.totalProducts],
                      ["Total Qty", selected.totalQuantity],
                      ["Total", `$${selected.total?.toFixed(2)}`],
                      [
                        "After Discount",
                        `$${selected.discountedTotal?.toFixed(2)}`,
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
                    {selected.products.map((p) => (
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

            {modal === "delete" && selected && (
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
                    Delete <strong>Cart #{selected.id}</strong> for{" "}
                    <strong>{selected.user.username}</strong>?
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

      <nav className={styles["adminCarts-header"]}>
        <h2 style={{ color: "white" }}>Carts Management</h2>
        <span>View, edit and delete customer carts</span>
      </nav>

      <main className={styles["adminCarts-content"]}>
        <div className={styles["stats"]}>
          <div
            className={`${styles["stats-card"]} ${styles["totalCarts-card"]}`}
          >
            <span style={{ fontWeight: "bold" }}>TOTAL CARTS</span>
            <h1 style={{ color: "white" }}>{totalCarts}</h1>
            <p style={{ color: "yellowgreen" }}>All carts</p>
          </div>
          <div
            className={`${styles["stats-card"]} ${styles["totalItems-card"]}`}
          >
            <span style={{ fontWeight: "bold" }}>TOTAL ITEMS</span>
            <h1 style={{ color: "white" }}>{totalItems}</h1>
            <p style={{ color: "yellowgreen" }}>Across all carts</p>
          </div>
          <div
            className={`${styles["stats-card"]} ${styles["totalValue-card"]}`}
          >
            <span style={{ fontWeight: "bold" }}>REVENUE</span>
            <h1 style={{ color: "white" }}>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(revenue)}
            </h1>
            <p style={{ color: "yellowgreen" }}>After applied discounts</p>
          </div>
          <div className={`${styles["stats-card"]} ${styles["avgValue-card"]}`}>
            <span style={{ fontWeight: "bold" }}>AVG CART VALUE</span>
            <h1 style={{ color: "white" }}>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(avgCartValue)}
            </h1>
            <p style={{ color: "yellowgreen" }}>Per cart</p>
          </div>
        </div>

        <div className={styles["carts-list"]}>
          <div className={styles["carts-list-header"]}>
            <h4>All Carts</h4>
            <div className={styles["carts-list-header-actions"]}>
              <input
                className={styles["search-input"]}
                type="text"
                placeholder="Search by user"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          </div>

          <div className={styles["carts-stats"]}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>PRODUCTS</th>
                  <th>TOTAL QTY</th>
                  <th>TOTAL</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {carts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "rgb(73,76,118)",
                      }}
                    >
                      No carts found
                    </td>
                  </tr>
                ) : (
                  carts.map((cart) => (
                    <tr key={cart.id}>
                      <td>#{cart.id}</td>
                      <td>
                        <div className={styles["user-cell"]}>
                          <div className={styles["user-avatar"]}>
                            {cart.user.username[0].toUpperCase()}
                          </div>
                          {`${cart.user.firstName} ${cart.user.lastName}`}
                        </div>
                      </td>
                      <td>
                        <span className={styles["products-count-badge"]}>
                          {cart.totalProducts} products
                        </span>
                      </td>
                      <td>{cart.totalQuantity} items</td>
                      <td style={{ color: "greenyellow" }}>
                        ${cart.total?.toFixed(2)}
                      </td>
                      <td>
                        <button
                          className={styles["view-btn"]}
                          onClick={() => openView(cart)}
                        >
                          View
                        </button>
                        <button
                          className={styles["delete-btn"]}
                          onClick={() => openDelete(cart)}
                        >
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
