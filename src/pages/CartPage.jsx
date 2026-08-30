import styles from "../css/Cart.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clear_cart,
  createCart,
  decrement_quantity,
  increment_quantity,
  remove_from_cart,
} from "../components/store/slices/CartsSlice";

export function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.carts.cart);

  const subtotal = () => {
    return cart
      .map((item) => item.quantity * item.price)
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(2);
  };

  const discount = () => {
    return cart
      .map((item) => (item.quantity * item.price * (item.discountPercentage || 0)) / 100)
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(2);
  };

  const total = () => {
    return (subtotal() - discount()).toFixed(2);
  };

  async function checkout() {
    const result = await dispatch(createCart(cart));
    if (createCart.fulfilled.match(result)) {
      dispatch(clear_cart());
      toast.success("Order placed successfully");
    } else {
      toast.error(result.payload?.message || "Failed to place order");
    }
  }

  return (
    <>
      <div className={styles["cart-container"]}>
        <div className={styles["cart"]}>
          <div className={styles["cart-header"]}>
            <h2 className={styles["cart-heading"]}>
              Your Cart
              <span className={styles["cart-count"]}>{cart.length} items</span>
            </h2>
            <button onClick={() => dispatch(clear_cart())}>Clear Cart</button>
          </div>
          <div className={styles["cart-content"]}>
            {cart.map((item) => (
              <div className={styles["item"]} key={item.id}>
                <div className={styles["image-container"]}>
                  <img src={item.thumbnail} alt={item.title} />
                </div>

                <div className={styles["item-info"]}>
                  <p className={styles["item-category"]}>{item.category}</p>
                  <strong>{item.title}</strong>

                  <div className={styles["rating-stars"]}>
                    <i
                      className={`fa-sharp ${item.rating >= 1 ? "fa-solid" : "fa-regular"} fa-star`}
                      style={{ color: "rgb(255, 212, 59)", fontSize: "11px" }}
                    ></i>
                    <i
                      className={`fa-sharp ${item.rating >= 2 ? "fa-solid" : "fa-regular"} fa-star`}
                      style={{ color: "rgb(255, 212, 59)", fontSize: "11px" }}
                    ></i>
                    <i
                      className={`fa-sharp ${item.rating >= 3 ? "fa-solid" : "fa-regular"} fa-star`}
                      style={{ color: "rgb(255, 212, 59)", fontSize: "11px" }}
                    ></i>
                    <i
                      className={`fa-sharp ${item.rating >= 4 ? "fa-solid" : "fa-regular"} fa-star`}
                      style={{ color: "rgb(255, 212, 59)", fontSize: "11px" }}
                    ></i>
                    <i
                      className={`fa-sharp ${item.rating === 5 ? "fa-solid" : "fa-regular"} fa-star`}
                      style={{ color: "rgb(255, 212, 59)", fontSize: "11px" }}
                    ></i>
                    <span>{item.rating}</span>
                  </div>

                  <div className={styles["item-amount-actions"]}>
                    <div
                      onClick={() => dispatch(decrement_quantity(item.id))}
                      className={styles["decrement"]}
                    >
                      −
                    </div>
                    <div className={styles["amount"]}>{item.quantity}</div>
                    <div
                      onClick={() => dispatch(increment_quantity(item.id))}
                      className={styles["increment"]}
                    >
                      +
                    </div>
                  </div>
                </div>

                <div className={styles["item-actions"]}>
                  <button
                    className={styles["remove-btn"]}
                    onClick={() => dispatch(remove_from_cart(item.id))}
                  >
                    <i
                      className="fa-solid fa-trash"
                      style={{ fontSize: "11px" }}
                    ></i>
                    Remove
                  </button>

                  <div className={styles["item-price"]}>
                    {item.discountPercentage > 0 ? (
                      <div>
                        <h1 className={styles["price"]}>
                          <span>${item.price.toFixed(2)}</span>$
                          {(
                            item.price -
                            (item.discountPercentage / 100) * item.price
                          ).toFixed(2)}
                        </h1>
                        <span className={styles["discount-badge"]}>
                          {Math.round(item.discountPercentage)}% OFF
                        </span>
                      </div>
                    ) : (
                      <h1 className={styles["price"]}>
                        ${item.price.toFixed(2)}
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles["cart-checkout"]}>
          <div className={styles["checkout-card"]}>
            <h2 className={styles["checkout-heading"]}>Order Summary</h2>

            <div className={styles["checkout-content"]}>
              <div className={styles["subtotal-row"]}>
                <p>Subtotal</p>
                <b>${subtotal()}</b>
              </div>
              <div className={styles["discount-row"]}>
                <p>Discount</p>
                <b>− ${discount()}</b>
              </div>
              <div className={styles["delivery-row"]}>
                <p>Delivery</p>
                <b>Free</b>
              </div>
            </div>

            <div className={styles["total-box"]}>
              <p>Total</p>
              <b>${total()}</b>
            </div>

            <div className={styles["promo-container"]}>
              <input type="text" placeholder="Promo code..." />
              <button className={styles["promo-btn"]}>Apply</button>
            </div>

            <button onClick={checkout} className={styles["checkout-btn"]}>
              Proceed to Checkout →
            </button>
            <Link to="/products">
              <button className={styles["continue-btn"]}>
                ← Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
