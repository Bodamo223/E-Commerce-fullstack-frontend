import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, refreshClient } from "../../api/axios";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/register", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const refreshSession = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshClient.post("auth/refresh");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Unauthenticated");
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.post("/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

function applySession(state, user, token) {
  state.user = user ?? null;
  state.token = token ?? null;
  state.isAuthenticated = !!token;
  state.isAdmin = user?.role === "admin";
  state.authChecked = true;
}

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  authChecked: false,
  message: "",
};

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setSession: (state, action) => {
      applySession(state, action.payload?.user, action.payload?.token);
    },
    clearAuth: (state) => {
      applySession(state, null, null);
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(register.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      applySession(state, action.payload.user, action.payload.access_token);
    })
      .addCase(register.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.message = action.payload?.message;
        applySession(state, action.payload.user, action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(refreshSession.pending, (state) => {
        state.authChecked = false;
      })
      .addCase(refreshSession.fulfilled, (state, action) => {
        applySession(state, action.payload.user, action.payload.access_token);
      })
      .addCase(refreshSession.rejected, (state) => {
        applySession(state, null, null);
      })
      .addCase(logout.fulfilled, (state) => {
        applySession(state, null, null);
        localStorage.removeItem("cart");
      })
      .addCase(logout.rejected, (state, action) => {
        applySession(state, null, null);
        state.message = action.payload;
        localStorage.removeItem("cart");
      });
  },
});

export const { setSession, clearAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
