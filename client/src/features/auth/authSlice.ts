import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "./authAPI";
import type { LoginForm } from "../../types/auth";
import toast from "react-hot-toast";

export const login = createAsyncThunk("auth/login", async (data: LoginForm) => {
  const response = await loginAPI(data);

  localStorage.setItem("token", response.token);
  toast.success("Login successful");
  return response;
});

//auth state interface
interface AuthState {
  token: string | null;
  loading: boolean;
}

//initial state
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
