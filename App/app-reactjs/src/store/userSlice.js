import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

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
