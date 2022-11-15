import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "./imageSlice";
import modalSlice from "./modalSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    image: imageSlice.reducer,
    modal: modalSlice.reducer,
  },
});
export default store;
