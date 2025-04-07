import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post("/login", credentials);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {
    let err = "Unknown error. Please, try again.";
    if (error.response?.data?.detail[0]?.msg) {
      err = error.response?.data?.detail[0]?.msg;
    } else if (error.response?.data?.detail && typeof error.response?.data?.detail === "string") {
      err = error.response?.data?.detail;
    }
    return rejectWithValue(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: JSON.parse(localStorage.getItem("user")) || null , token: localStorage.getItem("token") || null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;