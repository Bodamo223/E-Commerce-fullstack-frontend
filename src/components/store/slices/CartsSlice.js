import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/axios";

export const fetchCarts = createAsyncThunk("carts/fetchCarts", async (params, {rejectWithValue}) => {
  try {
    const response = await API.get("/carts", { params });
  return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to get carts'
    );
  }
});

export const createCart = createAsyncThunk("carts/createCart", async (credentials, {rejectWithValue}) => {
  try {
    const response = await API.post("/carts", { cart: credentials });
  return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to create cart'
    );
  }
});

export const deleteCart = createAsyncThunk("carts/deleteCart", async (id, {rejectWithValue}) => {
  try {
    const response = await API.delete(`/carts/${id}`);
  return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to delete cart'
    );
  }
});

const CartsSlice = createSlice({
  name: "carts",
  initialState: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    carts: [],
    totalCarts: 0,
    totalItems: 0,
    revenue: 0,
    avgCartValue: 0,
  },
  reducers: {
    add_to_cart: (state, action) => {
        const item = state.cart.find((item) => item.id === action.payload.id);
        if(!item){
        state.cart.push(action.payload);
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    remove_from_cart: (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clear_cart: (state) => {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    increment_quantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      const stockLimit = typeof item?.stock === "number" ? item.stock : Infinity;
      if (item && item.quantity < stockLimit) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    decrement_quantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.carts = action.payload.carts;
        state.totalCarts = action.payload.meta.total_carts;
        state.totalItems = action.payload.meta.total_items;
        state.revenue = action.payload.meta.revenue;
        state.avgCartValue = action.payload.meta.avg_per_cart;
      })

  },
});

export const {add_to_cart, remove_from_cart, clear_cart, increment_quantity, decrement_quantity,} = CartsSlice.actions;
export default CartsSlice.reducer;
