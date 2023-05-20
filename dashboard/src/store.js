import { configureStore } from "@reduxjs/toolkit";
import { vReducer } from "./vReducer";
const store = configureStore({
  reducer: {
    view: vReducer,
  },
});

export default store;
