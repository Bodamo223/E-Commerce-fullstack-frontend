import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HomePage } from "./pages/HomePage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { ProductsPage } from "./pages/ProductsPage.jsx";
import { ProductDetailsPage } from "./pages/ProductDetailsPage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { CartPage } from "./pages/CartPage.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { ProtectedRoutes, AdminRoute } from "./components/ProtectedRoutes.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { DashboardPage } from "./pages/Dashboard/DashboardPage.jsx";
import { Overview } from "./pages/Dashboard/Overview.jsx";
import { AdminUsers } from "./pages/Dashboard/AdminUsers.jsx";
import { AdminProducts } from "./pages/Dashboard/AdminProducts.jsx";
import { AdminCarts } from "./pages/Dashboard/AdminCarts.jsx";
import { refreshSession } from "./components/store/slices/AuthSlice.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshSession());
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
      />
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/products"
            element={
              <ProtectedRoutes>
                <ProductsPage />
              </ProtectedRoutes>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoutes>
                <ProductDetailsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <CartPage />
              </ProtectedRoutes>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <DashboardPage />
              </AdminRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="carts" element={<AdminCarts />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
