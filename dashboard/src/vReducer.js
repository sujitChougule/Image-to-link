import { createReducer } from "@reduxjs/toolkit";

export const vReducer = createReducer(
  { view: 0 },
  {
    viewIncreamenr: (state) => {
      state.view += 1;
    },
  }
);
