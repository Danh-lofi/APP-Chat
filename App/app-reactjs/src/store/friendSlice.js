import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userRequired: {},
  isEvicted: false,
};
const friendSlice = createSlice({
  name: "friend",
  initialState: initialState,
  reducers: {
    setUserRequired: (state, action) => {
      if (!action.payload) {
        return;
      }
      state.userRequired = action.payload;
      state.isEvicted = false;
    },
    setUserEvicted: (state, action) => {
      if (!action.payload) {
        return;
      }
      // state.userRequired = {};
      state.isEvicted = true;
    },
  },
});

export const friendSliceAction = friendSlice.actions;
export default friendSlice;
