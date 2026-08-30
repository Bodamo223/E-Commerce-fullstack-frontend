import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./slices/ProductsSlice";
import AuthReducer from "./slices/AuthSlice";
import UserReducer from "./slices/UsersSlice";
import CartsReducer from "./slices/CartsSlice";
import { bindAuthStore } from "../api/axios";

export const store = configureStore({
  reducer: {
    products: ProductsReducer,
    Auth: AuthReducer,
    users: UserReducer,
    carts: CartsReducer,
  },
});

bindAuthStore(store);
