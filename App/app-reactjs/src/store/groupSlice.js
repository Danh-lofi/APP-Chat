import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
};
const groupSlice = createSlice({
  name: "group",
  initialState: initialState,
  reducers: {
    setGroup: (state, action) => {
      if (!action.payload) {
        state.url = null;
        state.isOpen = false;
        return;
      }
      state.data = action;
    },
  },
});

export const groupAction = groupSlice.actions;
export default groupSlice;
