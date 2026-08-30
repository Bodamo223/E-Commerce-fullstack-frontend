import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "../css/Products.module.css";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchProducts,
  getProductsMetrics,
} from "../components/store/slices/ProductsSlice";
import { add_to_cart } from "../components/store/slices/CartsSlice";
import { toast } from "react-toastify";

export function ProductsPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 37000]);
  const [isShown, setIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState({
    "1-stars-rating": false,
    "2-stars-rating": false,
    "3-stars-rating": false,
    "4-stars-rating": false,
    "5-stars-rating": false,
  });
  const selectedRatings = Object.keys(rating)
    .filter((key) => rating[key])
    .map((key) => key.split("-")[0])
    .join(",");

  const products = useSelector((state) => state.products.products);
  const totalProducts = useSelector((state) => state.products.totalProducts);
  const total = useSelector((state) => state.products.total);
  const totalPages = Math.ceil(totalProducts / 20) || 1;
  const categoriesMetrics = useSelector(
    (state) => state.products.metrics.categoriesMetrics,
  );
  const ratingsMetrics = useSelector(
    (state) => state.products.metrics.ratingsMetrics,
  );

  const cart = useSelector((s) => s.carts.cart);

  useEffect(() => {
    const params = {
      search: searchTerm,
      category: activeCategory === "all" ? "" : activeCategory,
      min_price: priceRange[0],
      max_price: priceRange[1],
      rating: selectedRatings,
      sort_by: sortBy,
      sort_order: sortOrder,
      page: currentPage,
    };
    setSearchParams(params);
    dispatch(fetchProducts(params));
  }, [
    searchTerm,
    activeCategory,
    priceRange[0],
    priceRange[1],
    rating,
    sortBy,
    sortOrder,
    currentPage,
  ]);

  useEffect(() => {
    dispatch(getProductsMetrics());
  }, []);

  return (
    <>
      <main className={styles["container"]}>
        {sidebarOpen && (
          <div
            className={styles["sidebar-overlay"]}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={`${styles["sidebar"]} ${sidebarOpen ? styles["sidebar-open"] : ""}`}
        >
          <button
            className={styles["sidebar-close"]}
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
          <h3 className={styles["sidebar-title"]}>
            <span>
              <i className="fa-solid fa-sliders"></i>
            </span>
            Filters
          </h3>
          <div className={styles["categories"]}>
            <strong>CATEGORIES</strong>
            <ul className={styles["categories-list"]}>
              <li
                onClick={() => {
                  setActiveCategory("all");
                  setCurrentPage(1);
                }}
                style={{ color: activeCategory === "all" ? "white" : "" }}
                tabIndex="0"
                className={styles["category"]}
              >
                All Categories
                <span
                  style={{ color: activeCategory === "all" ? "white" : "" }}
                >
                  {total}
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveCategory("clothes");
                  setCurrentPage(1);
                }}
                style={{ color: activeCategory === "clothes" ? "white" : "" }}
                tabIndex="0"
                className={styles["category"]}
              >
                Clothes
                <span
                  style={{ color: activeCategory === "clothes" ? "white" : "" }}
                >
                  {categoriesMetrics.Clothes ?? 0}
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveCategory("shoes");
                  setCurrentPage(1);
                }}
                style={{ color: activeCategory === "shoes" ? "white" : "" }}
                tabIndex="0"
                className={styles["category"]}
              >
                Shoes
                <span
                  style={{ color: activeCategory === "shoes" ? "white" : "" }}
                >
                  {categoriesMetrics.Shoes ?? 0}
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveCategory("bags");
                  setCurrentPage(1);
                }}
                style={{ color: activeCategory === "bags" ? "white" : "" }}
                tabIndex="0"
                className={styles["category"]}
              >
                Bags
                <span
                  style={{ color: activeCategory === "bags" ? "white" : "" }}
                >
                  {categoriesMetrics.Bags ?? 0}
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveCategory("watches");
                  setCurrentPage(1);
                }}
                style={{ color: activeCategory === "watches" ? "white" : "" }}
                tabIndex="0"
                className={styles["category"]}
              >
                Watches
                <span
                  style={{ color: activeCategory === "watches" ? "white" : "" }}
                >
                  {categoriesMetrics.Watches ?? 0}
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveCategory("accessories");
                  setCurrentPage(1);
                }}
                style={{
                  color: activeCategory === "accessories" ? "white" : "",
                  display: isShown ? "block" : "none",
                }}
                tabIndex="0"
                className={styles["category"]}
              >
                Accessories
                <span
                  style={{
                    color: activeCategory === "accessories" ? "white" : "",
                  }}
                >
                  {categoriesMetrics.Accessories ?? 0}
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveCategory("fragrances");
                  setCurrentPage(1);
                }}
                tabIndex="0"
                className={styles["category"]}
                style={{
                  display: isShown ? "block" : "none",
                  color: activeCategory === "fragrances" ? "white" : "",
                }}
              >
                Fragrances
                <span
                  style={{
                    color: activeCategory === "fragrances" ? "white" : "",
                  }}
                >
                  {categoriesMetrics.Fragrances ?? 0}
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveCategory("Beauty & Care");
                  setCurrentPage(1);
                }}
                tabIndex="0"
                className={styles["category"]}
                style={{
                  display: isShown ? "block" : "none",
                  color: activeCategory === "beauty&care" ? "white" : "",
                }}
              >
                Beauty & Care
                <span
                  style={{
                    color: activeCategory === "beauty&care" ? "white" : "",
                  }}
                >
                  {categoriesMetrics["Beauty & Care"] ?? 0}
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveCategory("tech");
                  setCurrentPage(1);
                }}
                tabIndex="0"
                className={styles["category"]}
                style={{
                  display: isShown ? "block" : "none",
                  color: activeCategory === "tech" ? "white" : "",
                }}
              >
                Tech
                <span
                  style={{ color: activeCategory === "tech" ? "white" : "" }}
                >
                  {categoriesMetrics.Tech ?? 0}
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveCategory("home");
                  setCurrentPage(1);
                }}
                tabIndex="0"
                className={styles["category"]}
                style={{
                  display: isShown ? "block" : "none",
                  color: activeCategory === "home" ? "white" : "",
                }}
              >
                Home
                <span
                  style={{ color: activeCategory === "home" ? "white" : "" }}
                >
                  {categoriesMetrics.Home ?? 0}
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveCategory("Sports & Vehicles");
                  setCurrentPage(1);
                }}
                tabIndex="0"
                className={styles["category"]}
                style={{
                  display: isShown ? "block" : "none",
                  color: activeCategory === "sport&vehicles" ? "white" : "",
                }}
              >
                Sports & Vehicles
                <span
                  style={{
                    color:
                      activeCategory === "Sports & Vehicles" ? "white" : "",
                  }}
                >
                  {categoriesMetrics["Sports & Vehicles"] ?? 0}
                </span>
              </li>
              <li
                onClick={() => {
                  setActiveCategory("groceries");
                  setCurrentPage(1);
                }}
                tabIndex="0"
                className={styles["category"]}
                style={{
                  display: isShown ? "block" : "none",
                  color: activeCategory === "groceries" ? "white" : "",
                }}
              >
                Groceries
                <span
                  style={{
                    color: activeCategory === "groceries" ? "white" : "",
                  }}
                >
                  {categoriesMetrics.Groceries ?? 0}
                </span>
              </li>
            </ul>
          </div>

          <strong
            className={styles["show-more-btn"]}
            onClick={() => setIsShown((prev) => !prev)}
          >
            Show More
            <span>
              <i
                className={`fa-solid ${isShown ? "fa-chevron-up" : "fa-chevron-down"}`}
              ></i>
            </span>
          </strong>

          <div className={styles["price-container"]}>
            <strong>PRICE</strong>
            <div className={styles["price-range"]}>
              <p>$0</p>
              <p>$37000</p>
            </div>
            <Slider
              range
              min={0}
              max={37000}
              value={priceRange}
              defaultValue={[0, 37000]}
              onChange={(value) => {
                setPriceRange(value);
                setCurrentPage(1);
              }}
              trackStyle={{ backgroundColor: "#1e203a" }}
              handleStyle={{ borderColor: "#1e203a" }}
            />
            <div className={styles["price-values"]}>
              <div className={styles["min"]}>
                <span>$</span>
                <input
                  type="text"
                  id="min-input"
                  onChange={(e) => {
                    setPriceRange([Number(e.target.value) || 0, priceRange[1]]);
                    setCurrentPage(1);
                  }}
                  value={priceRange[0]}
                />
              </div>
              <div className={styles["separator"]}>-</div>
              <div className={styles["max"]}>
                <span>$</span>
                <input
                  id="max-input"
                  type="text"
                  onChange={(e) => {
                    setPriceRange([priceRange[0], Number(e.target.value) || 0]);
                    setCurrentPage(1);
                  }}
                  value={priceRange[1]}
                />
              </div>
            </div>
          </div>

          <div className={styles["rating-container"]}>
            <strong>RATING</strong>
            <ul className={styles["rating-list"]}>
              {[5, 4, 3, 2, 1].map((stars) => (
                <li key={stars}>
                  <input
                    type="checkbox"
                    className={styles["rating-checkbox"]}
                    checked={rating[`${stars}-stars-rating`]}
                    onChange={() => {
                      setRating((prev) => ({
                        ...prev,
                        [`${stars}-stars-rating`]:
                          !prev[`${stars}-stars-rating`],
                      }));
                      setCurrentPage(1);
                    }}
                  />
                  <div className={styles["rating-stars"]}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <i
                        key={i}
                        className={`fa-sharp ${i <= stars ? "fa-solid" : "fa-regular"} fa-star`}
                        style={{ color: "rgb(255, 212, 59)" }}
                      ></i>
                    ))}
                  </div>
                  <p className={styles["rating-count"]}>
                    {ratingsMetrics[stars] ?? 0}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className={styles["products-container"]}>
          <div className={styles["products-header"]}>
            <button
              className={styles["filter-toggle-btn"]}
              onClick={() => setSidebarOpen(true)}
            >
              <i className="fa-solid fa-sliders"></i> Filters
            </button>
            <div className={styles["searchbar-container"]}>
              <input
                className={styles["products-searchbar"]}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Enter product name..."
              />
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: "#c7c0f0" }}
              ></i>
            </div>
            <p className={styles["products-count"]}>
              Show {totalProducts} products of {total}
            </p>
            <select
              className={styles["sort-select"]}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order);
                setCurrentPage(1);
              }}
              value={sortBy && sortOrder ? `${sortBy}-${sortOrder}` : ""}
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rating</option>
              <option value="rating-asc">Lowest Rating</option>
              <option value="title-asc">Name: A → Z</option>
              <option value="title-desc">Name: Z → A</option>
            </select>
          </div>
          <div className={styles["products"]}>
            {isLoading ? (
              <span className={styles["loader"]}></span>
            ) : products.length === 0 ? (
              <h3 className={styles["no-products-msg"]}>No products found</h3>
            ) : (
              products.map((product) => (
                <div
                  className={styles["product"]}
                  style={{ display: product.stock === 0 ? "none" : "block" }}
                  key={product.id}
                >
                  <div
                    className={styles["badge"]}
                    style={{
                      display:
                        product.discountPercentage > 0
                          ? "inline-block"
                          : "none",
                    }}
                  >
                    10%
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <div className={styles["image-container"]}>
                      <img
                        className={styles["product-image"]}
                        src={product.thumbnail}
                        alt={product.title}
                      />
                    </div>
                  </Link>
                  <div className={styles["product-data"]}>
                    <div className={styles["product-info"]}>
                      <p style={{ color: "rgb(73, 76, 118)" }}>
                        {product.category}
                      </p>
                      <h2 className={styles["product-price"]}>
                        ${product.price}
                      </h2>
                    </div>
                    <div className={styles["rating-stars"]}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <i
                          key={i}
                          className={`fa-sharp ${product.rating >= i ? "fa-solid" : "fa-regular"} fa-star`}
                          style={{ color: "rgb(255, 212, 59)" }}
                        ></i>
                      ))}
                    </div>
                    <h4 className={styles["product-title"]}>{product.title}</h4>
                  </div>
                  <button
                    className={styles["add-to-cart-button"]}
                    onClick={() => {
                      if (!cart.some((item) => item.id === product.id)) {
                        dispatch(add_to_cart({ ...product, quantity: 1 }));
                        toast.success("Added to cart");
                      } else {
                        toast.error("Item already added");
                      }
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              ))
            )}
          </div>
          <div className={styles["pag"]}>
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? styles["active-page"] : ""}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
