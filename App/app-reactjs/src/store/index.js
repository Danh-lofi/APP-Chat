import { configureStore } from "@reduxjs/toolkit";
import friendSlice from "./friendSlice";
import imageSlice from "./imageSlice";
import modalSlice from "./modalSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    image: imageSlice.reducer,
    modal: modalSlice.reducer,
    friend: friendSlice.reducer,
  },
});
export default store;
