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
export const profile = createAsyncThunk("/profile", async (accessToken) => {
  try {
    const response = await authApi.profile(accessToken);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error.response.status);
    return { status: error.response.status };
  }
});

const initialState = user
  ? { isLoggedIn: true, user: user }
  : { isLoggedIn: false, user: null };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoggedIn = false;
      state.user = action.payload.data.username;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data.user;
      state = JSON.parse(JSON.stringify(state));
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [profile.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      if (action.payload.data) {
        state.user = action.payload.data.user;
      }
    },
    [profile.rejected]: (state, action) => {
      console.log("profile error");
      // state.isLoggedIn = true;
      // state.user = action.payload.data.user;
    },
    // [logout.fulfilled]: (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    // },
  },
});

export default userSlice;
