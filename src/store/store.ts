import { configureStore } from "@reduxjs/toolkit";
import TimerSlice from "../features/TimerSlice";

export const store = configureStore({
  reducer: { TimerSlice },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
