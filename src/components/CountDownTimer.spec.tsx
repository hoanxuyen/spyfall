import { act, render } from "@testing-library/react";
import CountDownTimer from "./CountDownTimer";
import { screen } from "@storybook/test";
import { ElementTestIds } from "../SpyUlt";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { setInitialValue } from "../features/TimerSlice";

describe("CountdownTimer component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    store.dispatch(setInitialValue(2));
    render(
      <Provider store={store}>
        <CountDownTimer />
      </Provider>
    );
  });
  afterEach(() => {
    vi.useRealTimers(); // reset timers after each test
  });
  it("Should render the timer label", () => {
    expect(
      screen.getByTestId(ElementTestIds.countdownLabel)
    ).toBeInTheDocument();
  });
  it("Should render initial time when submit form", async () => {
    expect(store.getState().TimerSlice.value).toBe(120);
    expect(screen.getByTestId(ElementTestIds.countdownLabel)).toHaveTextContent(
      "2:00"
    );
  });
  it("Should decrements the timer every seconds", async () => {
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByTestId(ElementTestIds.countdownLabel)).toHaveTextContent(
      "1:58"
    );
  });
});
