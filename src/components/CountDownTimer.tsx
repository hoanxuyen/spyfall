"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { decrement } from "../features/TimerSlice";

export default function CountDownTimer() {
  const value = useSelector((state: RootState) => state.TimerSlice.value);
  const dispatch = useDispatch();
  useEffect(() => {
    if (value > 0) {
      const intervalId = setInterval(() => {
        dispatch(decrement());
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [value, dispatch]);
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return (
    <div className="p-4 border-2 text-center text-5xl">
      <p data-testid="countdownLabel">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
}
