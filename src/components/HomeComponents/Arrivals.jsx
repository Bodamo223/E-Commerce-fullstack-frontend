import { useSelector } from "react-redux";
import styles from "../../css/Arrivals.module.css";

export function Arrivals() {
  const products = useSelector((state) => state.products.products);
  const newArrivals = products.slice(0, 20);
  return (
    <section className={styles["arrivals-section"]}>
      <div className={styles["arrivals-heading"]}>
        <h1>Latest Arrivals</h1>
      </div>
      <div className={styles["carousel"]}>
        <div className={styles["inner"]}>
          <div className={styles["group"]} aria-hidden="true">
            {newArrivals.map((product) => {
              return (
                <div key={product.id} className={styles["card"]}>
                  <img src={product.thumbnail} alt={product.title} />
                  <div className={styles["product-info"]}>
                    <p className={styles["product-title"]}>{product.title}</p>
                    <div className={styles["product-data"]}>
                      <p className={styles["product-category"]}>
                        {product.category}
                      </p>
                      <strong className={styles["product-price"]}>
                        ${product.price}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles["group"]} aria-hidden="true">
            {newArrivals.map((product) => {
              return (
                <div key={product.id} className={styles["card"]}>
                  <img src={product.thumbnail} alt={product.title} />
                  <div className={styles["product-info"]}>
                    <p className={styles["product-title"]}>{product.title}</p>
                    <div className={styles["product-data"]}>
                      <p className={styles["product-category"]}>
                        {product.category}
                      </p>
                      <strong className={styles["product-price"]}>
                        ${product.price}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
