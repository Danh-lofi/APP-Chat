import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  url: "",
  isSelected: false,
};
const imageSlice = createSlice({
  name: "image",
  initialState: initialState,
  reducers: {
    setImage: (state, action) => {
      if (!action.payload) {
        state.url = null;
        state.isSelected = false;
        return;
      }
      state.url = action.payload;
      state.isSelected = true;
    },
  },
});

export const imageAction = imageSlice.actions;
export default imageSlice;
