import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "./imageSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    image: imageSlice.reducer,
  },
});
export default store;
