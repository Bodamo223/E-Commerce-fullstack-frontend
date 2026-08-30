import { useState, useMemo, useEffect } from "react";
import styles from "../../css/AdminProducts.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
} from "../../components/store/slices/ProductsSlice";
import { Pagination } from "../../components/Pagination";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const EMPTY_FORM = {
  title: "",
  category: "",
  price: "",
  stock: "",
  rating: "",
};

const Field = ({
  label,
  name,
  type = "text",
  required,
  textarea,
  form,
  onChange,
}) => (
  <div className={styles["form-group"]}>
    <label>{label}</label>
    {textarea ? (
      <textarea
        className={`${styles["form-input"]}`}
        name={name}
        value={form[name]}
        onChange={onChange}
        rows={3}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    ) : (
      <input
        className={`${styles["form-input"]}`}
        type={type}
        name={name}
        value={form[name]}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    )}
  </div>
);

const stockColor = (stock) =>
  stock === 0
    ? "rgb(238,29,29)"
    : stock < 5
      ? "rgb(255,145,0)"
      : "rgb(120,201,0)";

export function AdminProducts() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, totalProducts, total, in_stock, low_stock, out_of_stock } =
    useSelector((s) => s.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const totalPages = Math.ceil(totalProducts / 20) || 1;

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setThumbnailFile(null);
    setImageFiles([]);
    setModal("add");
  };
  const openEdit = (p) => {
    setSelected(p);
    setForm({
      title: p.title || "",
      category: p.category || "",
      price: p.price || "",
      stock: p.stock || "",
      rating: p.rating || "",
    });
    setThumbnailFile(null);
    setImageFiles([]);
    setModal("edit");
  };
  const openView = (p) => {
    setSelected(p);
    setModal("view");
  };
  const openDelete = (p) => {
    setSelected(p);
    setModal("delete");
  };
  const closeModal = () => {
    setModal(null);
    setSelected(null);
    setThumbnailFile(null);
    setImageFiles([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const refetch = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const buildProductFormData = (isUpdate = false) => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("rating", form.rating);
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }
    Array.from(imageFiles || []).forEach((file) => {
      formData.append("images[]", file);
    });
    if (isUpdate) {
      formData.append("_method", "PUT");
    }
    return formData;
  };

  async function handleAdd() {
    const result = await dispatch(addProduct(buildProductFormData()));
    if (addProduct.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      refetch();
      closeModal();
    } else {
      toast.error(result.payload);
    }
  }

  async function handleEdit() {
    const result = await dispatch(
      updateProduct({ id: selected.id, credentials: buildProductFormData(true) }),
    );
    if (updateProduct.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      refetch();
      closeModal();
    } else {
      toast.error(result.payload);
    }
  }

  async function handleDelete(id) {
    const result = await dispatch(deleteProduct(id));
    if (deleteProduct.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      closeModal();
      refetch();
    } else {
      toast.error(result.payload);
    }
  }

  useEffect(() => {
    const params = {
      search: searchTerm,
      page: currentPage,
    };
    setSearchParams(params);
    dispatch(fetchProducts(params));
  }, [searchTerm, currentPage]);

  return (
    <>
      {modal && (
        <div className={styles["modal-overlay"]} onClick={closeModal}>
          <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
            {(modal === "add" || modal === "edit") && (
              <>
                <div className={styles["modal-header"]}>
                  <h3>
                    {modal === "add" ? "Add New Product" : "Edit Product"}
                  </h3>
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
                      label="Title"
                      name="title"
                      required
                      form={form}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles["form-row"]}>
                    <Field
                      label="Category"
                      name="category"
                      required
                      form={form}
                      onChange={handleChange}
                    />
                    <Field
                      label="Price ($)"
                      name="price"
                      type="number"
                      required
                      form={form}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles["form-row"]}>
                    <Field
                      label="Stock"
                      name="stock"
                      type="number"
                      required
                      form={form}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles["form-row"]}>
                    <Field
                      label="Rating"
                      name="rating"
                      type="number"
                      required
                      form={form}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles["form-row"]}>
                    <div className={styles["form-group"]}>
                      <label>Thumbnail</label>
                      <input
                        className={styles["form-input"]}
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setThumbnailFile(e.target.files?.[0] || null)
                        }
                      />
                    </div>
                    <div className={styles["form-group"]}>
                      <label>Images</label>
                      <input
                        className={styles["form-input"]}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          setImageFiles(e.target.files || [])
                        }
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
                    onClick={modal === "add" ? handleAdd : handleEdit}
                  >
                    {modal === "add" ? "Add Product" : "Save Changes"}
                  </button>
                </div>
              </>
            )}

            {modal === "view" && selected && (
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
                  {selected.thumbnail && (
                    <img
                      src={selected.thumbnail}
                      alt={selected.title}
                      className={styles["product-img-preview"]}
                    />
                  )}
                  <div className={styles["view-grid"]}>
                    {[
                      ["ID", `${selected.id}`],
                      ["Title", selected.title],
                      ["Category", selected.category],
                      ["Price", `$${selected.price}`],
                      ["Stock", selected.stock],
                      ["Rating", selected.rating],
                    ].map(([label, value]) => (
                      <div key={label} className={styles["view-field"]}>
                        <span className={styles["view-label"]}>{label}</span>
                        <span className={styles["view-value"]}>
                          {value ?? "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                  {selected.description && (
                    <p className={styles["product-description"]}>
                      {selected.description}
                    </p>
                  )}
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
                    Delete <strong>{selected.title}</strong>?
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

      <nav className={styles["adminProducts-header"]}>
        <h2 style={{ color: "white" }}>Products Management</h2>
        <span>View, add, edit and delete products</span>
      </nav>

      <main className={styles["adminProducts-content"]}>
        <div className={styles["stats"]}>
          <div
            className={`${styles["stats-card"]} ${styles["totalProducts-card"]}`}
          >
            <span style={{ fontWeight: "bold" }}>TOTAL PRODUCTS</span>
            <h1 style={{ color: "white" }}>{total}</h1>
            <p style={{ color: "yellowgreen" }}>All categories</p>
          </div>
          <div
            className={`${styles["stats-card"]} ${styles["inStockProducts-card"]}`}
          >
            <span style={{ fontWeight: "bold" }}>IN STOCK</span>
            <h1 style={{ color: "white" }}>{in_stock}</h1>
            <p style={{ color: "yellowgreen" }}>
              {total ? ((in_stock / total) * 100).toFixed(0) : 0}% available
            </p>
          </div>
          <div
            className={`${styles["stats-card"]} ${styles["lowStockProducts-card"]}`}
          >
            <span style={{ fontWeight: "bold" }}>LOW STOCK</span>
            <h1 style={{ color: "white" }}>{low_stock}</h1>
            <p style={{ color: "yellowgreen" }}>Less than 5 left</p>
          </div>
          <div
            className={`${styles["stats-card"]} ${styles["outOFStockProducts-card"]}`}
          >
            <span style={{ fontWeight: "bold" }}>OUT OF STOCK</span>
            <h1 style={{ color: "white" }}>{out_of_stock}</h1>
            <p style={{ color: "yellowgreen" }}>Needs restock</p>
          </div>
        </div>

        <div className={styles["products-list"]}>
          <div className={styles["products-list-header"]}>
            <h4>All Products</h4>
            <div className={styles["products-list-header-actions"]}>
              <input
                className={styles["search-input"]}
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <button className={styles["add-product-btn"]} onClick={openAdd}>
                + Add Product
              </button>
            </div>
          </div>

          <div className={styles["products-stats"]}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>PRODUCT</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>STOCK</th>
                  <th>RATING</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "rgb(73,76,118)",
                      }}
                    >
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>#{product.id}</td>
                      <td>
                        <div className={styles["product-cell"]}>
                          {product.thumbnail && (
                            <img
                              src={product.thumbnail}
                              alt=""
                              className={styles["product-thumb"]}
                              onError={(e) => (e.target.style.display = "none")}
                            />
                          )}
                          <span>{product.title}</span>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>${product.price}</td>
                      <td style={{ color: stockColor(product.stock) }}>
                        {product.stock} left
                      </td>
                      <td>⭐ {product.rating}</td>
                      <td>
                        <button
                          className={styles["view-btn"]}
                          onClick={() => openView(product)}
                        >
                          View
                        </button>
                        <button
                          className={styles["edit-btn"]}
                          onClick={() => openEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles["delete-btn"]}
                          onClick={() => openDelete(product)}
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
