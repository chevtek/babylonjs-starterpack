import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Color3 } from "@babylonjs/core";

export interface AppState {
  boxColor: Color3;
}

const initialState: AppState = {
  boxColor: Color3.Red(),
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<Color3>) => {
      state.boxColor = action.payload;
    },
  },
});

export const { changeColor } = appSlice.actions;
export default appSlice.reducer;
