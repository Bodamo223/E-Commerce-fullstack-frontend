import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await API.get("/products", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get products'
      );
    } 
  },
);

export const getProductsMetrics = createAsyncThunk("products/metrics", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/products/metrics");
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to get metrics'
    );
  }
})

export const addProduct = createAsyncThunk('products/addProduct', async (credentials, {rejectWithValue}) => {
  try {
    const response = await API.post("/products", credentials, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to add product'
    );
  }
})

export const updateProduct = createAsyncThunk('products/updateProduct', async ({id, credentials}, {rejectWithValue}) => {
  try {
    const response = await API.post(`/products/${id}`, credentials, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to update product'
    );
  }
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, {rejectWithValue}) => {
  try {
    const response = await API.delete(`products/${id}`);
    return response.data
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to delete product'
    );
  }
})

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    currentPage: 1,
    itemsPerPage: 20,
    totalProducts: 0,
    total: 0,
    in_stock: 0,
    low_stock: 0, 
    out_of_stock: 0,
    metrics: {
      categoriesMetrics: {},
      ratingsMetrics: {},
    },
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload.products;
        state.totalProducts = action.payload.meta.total_products;
        state.total = action.payload.meta.total;
        state.in_stock = action.payload.meta.in_stock;
        state.low_stock = action.payload.meta.low_stock;
        state.out_of_stock = action.payload.meta.out_of_stock;
        state.message = action.payload.message;
      })
      .addCase(getProductsMetrics.fulfilled, (state, action) => {
        state.metrics = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.message = action.payload.message;
      })
  },
});

export default ProductsSlice.reducer;