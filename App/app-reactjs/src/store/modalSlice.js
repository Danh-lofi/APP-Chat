import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
  isChangeProfileModal: false,
  confirm: {
    title: "",
    content: "",
    onConfirm: null,
    isOpenConfirm: false,
  },
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
    setOpenConfirm: (state, action) => {
      if (!action.payload) {
        state.confirm = {
          title: "",
          content: "",
          onConfirm: null,
          isOpenConfirm: false,
        };
      }
      state.confirm = action.payload;
    },
  },
});

export const modalSliceAction = modalSlice.actions;
export default modalSlice;
