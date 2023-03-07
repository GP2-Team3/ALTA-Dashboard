import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: number;
  full_name?: string | any;
  password?: string;
  email?: string | any;
  role?: string | any;
  token?: string | any;
  team?: string;
  status?: string;
  data?: any;
}

export interface AuthState {
  isAuth: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isAuth = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
