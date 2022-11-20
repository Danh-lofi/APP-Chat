import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userRequired: {},
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
    },
  },
});

export const friendSliceAction = friendSlice.actions;
export default friendSlice;
