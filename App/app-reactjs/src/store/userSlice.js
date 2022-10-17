import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "/login",
  async ({ username, password }) => {
    try {
      const res = await authApi.login(username, password);
      return { data: res.data, status: res.status };
    } catch (error) {
      console.log(error);
    }
  }
);

export const register = createAsyncThunk(
  "/register",
  async ({ username, password }) => {
    try {
      const response = await authApi.register(username, password);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      console.log(state);
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data.user;
      state = JSON.parse(JSON.stringify(state));
      console.log(state);
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    // [logout.fulfilled]: (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    // },
  },
});

export default userSlice;
