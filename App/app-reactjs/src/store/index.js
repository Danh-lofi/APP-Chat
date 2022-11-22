import { configureStore } from "@reduxjs/toolkit";
import friendSlice from "./friendSlice";
import groupSlice from "./groupSlice";
import imageSlice from "./imageSlice";
import modalSlice from "./modalSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    image: imageSlice.reducer,
    modal: modalSlice.reducer,
    friend: friendSlice.reducer,
    group: groupSlice.reducer,
  },
});
export default store;
