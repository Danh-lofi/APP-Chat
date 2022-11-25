import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  addFriendToGroup: {
    isOpen: false,
    idGroupChat: "",
    listIdUserInGroup: [],
  },
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
    setOpenAddFriendToGroup: (state, action) => {
      if (!action.payload) {
        state.addFriendToGroup.isOpen = false;
        return;
      }
      const { idGroupChat, listIdUserInGroup } = action.payload;
      state.addFriendToGroup.isOpen = true;
      state.addFriendToGroup.idGroupChat = idGroupChat;
      state.addFriendToGroup.listIdUserInGroup = listIdUserInGroup;
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
