import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    profileImage: string;
    role: string;
  } | null;
  loading: boolean;
  token: string | null;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  loading: true,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") as string)
    : null,
  isAdmin: localStorage.getItem("forbiddenZone")
    ? JSON.parse(localStorage.getItem("forbiddenZone") as string)
    : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
  },
});

export const { setLoading, setToken, setUser, setIsAdmin } = authSlice.actions;

export default authSlice.reducer;
