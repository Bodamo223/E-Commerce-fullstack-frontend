import styles from "../../css/Features.module.css";
export function Features() {
  return (
    <>
      <section className={styles["features-section"]}>
        <div className={styles["features-heading"]}>
          <h1>Our Features</h1>
        </div>
        <div className={styles["features"]}>
          <div className={styles["feature"]}>
            <div className={styles["icon"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1e203a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-truck-icon lucide-truck"
              >
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M15 18H9" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                <circle cx="17" cy="18" r="2" />
                <circle cx="7" cy="18" r="2" />
              </svg>
            </div>
            <h2>Free & Fast Shipping</h2>
            <p>
              Get your favorites delivered to your doorstep in record time. We
              offer reliable, lightning-fast shipping on all orders with zero
              hidden costs.
            </p>
          </div>
          <div className={styles["feature"]}>
            <div className={styles["icon"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1e203a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-credit-card-icon lucide-credit-card"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <h2>Secure Payment</h2>
            <p>
              Your privacy is our priority. Shop with total peace of mind using
              our SSL-encrypted payment gateways that protect your data 24/7.
            </p>
          </div>
          <div className={styles["feature"]}>
            <div className={styles["icon"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1e203a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-headset-icon lucide-headset"
              >
                <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
                <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
              </svg>
            </div>
            <h2>24/7 Customer Support</h2>
            <p>
              We’re here whenever you need us. Our dedicated support team is
              available around the clock to ensure your shopping experience is
              seamless.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
