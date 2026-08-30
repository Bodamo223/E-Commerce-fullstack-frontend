import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "../css/ProductDetails.module.css";
import { add_to_cart } from "../components/store/slices/CartsSlice";

import { toast } from "react-toastify";
import { useState } from "react";
export function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.carts.cart);
  const { products } = useSelector((s) => s.products); // adjust to your actual products slice shape
  const [quantity, setQuantity] = useState(1);

  if (!products || products.length === 0) return <p>Loading...</p>;

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found</p>;
  return (
    <>
      <div className={styles["product-container"]}>
        <div className={styles["product"]}>
          <div className={styles["image-container"]}>
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className={styles["product-info"]}>
            <div className={styles["product-details"]}>
              <span className={styles["product-category"]}>
                {product.category}
              </span>
              <h2 className={styles["product-title"]}>{product.title}</h2>
              <div className={styles["rating-stars"]}>
                <i
                  className={`fa-sharp ${product.rating >= 1 ? "fa-solid" : "fa-regular"} fa-star`}
                  style={{ color: "rgb(255, 212, 59)", fontSize: "11px" }}
                ></i>
                <i
                  className={`fa-sharp ${product.rating >= 2 ? "fa-solid" : "fa-regular"} fa-star`}
                  style={{ color: "rgb(255, 212, 59)", fontSize: "11px" }}
                ></i>
                <i
                  className={`fa-sharp ${product.rating >= 3 ? "fa-solid" : "fa-regular"} fa-star`}
                  style={{ color: "rgb(255, 212, 59)", fontSize: "11px" }}
                ></i>
                <i
                  className={`fa-sharp ${product.rating >= 4 ? "fa-solid" : "fa-regular"} fa-star`}
                  style={{ color: "rgb(255, 212, 59)", fontSize: "11px" }}
                ></i>
                <i
                  className={`fa-sharp ${product.rating === 5 ? "fa-solid" : "fa-regular"} fa-star`}
                  style={{ color: "rgb(255, 212, 59)", fontSize: "11px" }}
                ></i>
                <span>{product.rating}</span>
              </div>
              <div className={styles["product-description"]}>
                {product.description}
              </div>
              <div className={styles["product-price"]}>
                <h1 className={styles["price"]}>
                  $
                  {!(product.discountPercentage > 0)
                    ? Number(product.price)
                    : Number(
                        (
                          product.price -
                          product.price * (product.discountPercentage / 100)
                        ).toFixed(2),
                      )}
                </h1>
                <h3
                  style={{
                    display:
                      product.discountPercentage > 0
                        ? "block"
                        : "none",
                  }}
                  className={styles["price-before-discount"]}
                >
                  ${product.price}
                </h3>
                <div
                  style={{
                    display:
                      product.discountPercentage > 0
                        ? "block"
                        : "none",
                  }}
                  className={styles["badge"]}
                >
                  <p>
                    Save $
                    {Number(
                      (
                        product.price *
                        (product.discountPercentage / 100)
                      ).toFixed(2),
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles["product-actions"]}>
              <div className={styles["product-badges"]}>
                <div className={styles["badge-stock"]}>
                  <i className="fa-solid fa-circle-check"></i>
                  <span>In Stock · {product.stock} left</span>
                </div>
                <div className={styles["badge-info"]}>
                  <i className="fa-solid fa-truck-fast"></i>
                  <span>Free Delivery</span>
                </div>
                <div className={styles["badge-info"]}>
                  <i className="fa-solid fa-rotate-left"></i>
                  <span>30-Day Returns</span>
                </div>
              </div>

              <div className={styles["product-amount-actions"]}>
                <span>Quantity</span>
                <div className={styles["amount-actions"]}>
                  <div
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity((prev) => prev - 1);
                      }
                    }}
                    className={styles["decrement"]}
                  >
                    −
                  </div>
                  <div className={styles["amount"]}>{quantity}</div>
                  <div
                    onClick={() => {
                      setQuantity((prev) => prev + 1);
                    }}
                    className={styles["increment"]}
                  >
                    +
                  </div>
                </div>
              </div>

              <div className={styles["product-buttons"]}>
                <button
                  className={styles["add-to-cart-btn"]}
                  onClick={() => {
                    if (!cart.some((item) => item.id === product.id)) {
                      dispatch(add_to_cart({ ...product, quantity }));
                      toast.success("Added to cart");
                      setQuantity(1);
                    } else {
                      toast.error("Item already added");
                    }
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
