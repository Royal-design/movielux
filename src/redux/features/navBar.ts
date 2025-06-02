import { createSlice } from "@reduxjs/toolkit";

const initialState: { isVisible: boolean } = {
  isVisible: true
};

export const navBar = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    showNavbar: (state) => {
      state.isVisible = true;
    },
    hideNavbar: (state) => {
      state.isVisible = false;
    },
    toggleNavbar: (state) => {
      state.isVisible = !state.isVisible;
    }
  }
});

export const { showNavbar, hideNavbar, toggleNavbar } = navBar.actions;

export default navBar.reducer;
