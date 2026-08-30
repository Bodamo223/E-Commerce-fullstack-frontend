import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (params, {rejectWithValue}) => {
  try {
    const response = await API.get("/users", { params });
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch users'
    );
  }
});

export const addUser = createAsyncThunk('users/addUser', async (credentials, {rejectWithValue}) => {
  try{
    const response = await API.post("/users", credentials);
    return response.data;
  }catch(error){
    return rejectWithValue(
      error.response?.data?.message || 'Failed to add user'
    );
  }
})

export const editUser = createAsyncThunk('users/editUser', async ({credentials, id}, {rejectWithValue}) => {
  try {
    const response = await API.put(`/users/${id}`, credentials);
    return response.data
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to update user'
    );
  }
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id, {rejectWithValue}) => {
  try {
    const response = await API.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to delete user'
    );
  }
})

const UsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    totalUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.users;
      state.totalUsers = action.payload.meta.total_users;
      state.adminUsers = action.payload.meta.admins;
      state.regularUsers = action.payload.meta.regular_users;
    })
  },
});

export default UsersSlice.reducer;
