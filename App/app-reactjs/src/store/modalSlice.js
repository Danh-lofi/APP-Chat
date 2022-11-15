import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
  isChangeProfileModal: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setOpen: (state, action) => {
      if (!action.payload) {
        state.url = null;
        state.isOpen = false;
        return;
      }
      state.isOpen = true;
    },
    setChangeProfileOpen: (state, action) => {
      if (!action.payload) {
        state.url = null;
        state.isChangeProfileModal = false;
        return;
      }
      state.isChangeProfileModal = true;
    },
  },
});

export const modalSliceAction = modalSlice.actions;
export default modalSlice;
