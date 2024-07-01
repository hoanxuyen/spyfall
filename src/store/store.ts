import { configureStore } from "@reduxjs/toolkit";
import TimerSlice from "../features/TimerSlice";
import PlayerSlice from "../features/PlayerSlice";
import ModalSlice from "../features/ModalSlice";

export const store = configureStore({
  reducer: { TimerSlice, PlayerSlice, ModalSlice },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
