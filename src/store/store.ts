/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { configureStore, Middleware } from "@reduxjs/toolkit";
import PlayerSlice from "../features/PlayerSlice";
import ModalSlice from "../features/ModalSlice";
import TimerSlice from "../features/TimerSlice";
export const APPLICATION_STATE_KEY = "applicationState";
// eslint-disable-next-line @typescript-eslint/ban-types
const localStorageMiddleware: Middleware<{}, RootState> = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem(APPLICATION_STATE_KEY, JSON.stringify(getState()));
    return result;
  };
};
const reHydrateStore = () => {
  const applicationState = localStorage.getItem(APPLICATION_STATE_KEY);
  if (applicationState !== null) {
    return JSON.parse(applicationState);
  }
};
export const store = configureStore({
  reducer: { TimerSlice, PlayerSlice, ModalSlice },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
