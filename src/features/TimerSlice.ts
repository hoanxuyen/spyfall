import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TimerState = {
  value: number;
};
const initialState: TimerState = {
  value: 300,
};
export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setInitialValue: (state, action: PayloadAction<number>) => {
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
