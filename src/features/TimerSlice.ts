import { createSlice } from "@reduxjs/toolkit";
export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    value: 0,
  },
  reducers: {
    setInitialValue: (state, action) => {
      state.value = action.payload * 60;
    },
    decrement: (state) => {
      if (state.value > 1) {
        state.value -= 1;
      }
    },
  },
});
export const { decrement, setInitialValue } = timerSlice.actions;
export default timerSlice.reducer;

