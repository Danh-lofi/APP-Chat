import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  group: {},
};
const groupSlice = createSlice({
  name: "group",
  initialState: initialState,
  reducers: {
    setGroup: (state, action) => {
      if (!action.payload) {
        return;
      }
      state.group = action.payload;
    },
  },
});

export const groupAction = groupSlice.actions;
export default groupSlice;
