import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});
export const { setOpen } = modalSlice.actions;
export default modalSlice.reducer;
