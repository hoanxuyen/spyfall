import { Provider } from "react-redux";
import { BrowserRouter} from "react-router-dom";
import { act, render, screen } from "@testing-library/react";
import SpyDiscuss from "./SpyDiscuss";
import { Store, configureStore } from "@reduxjs/toolkit";
import userEvent, { UserEvent } from "@testing-library/user-event";
import TimerSlice, { setInitialValue } from "../features/TimerSlice";

const mockUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...mod,
    useNavigate: () => mockUseNavigate,
  };
});
describe("SpyDiscuss Component", () => {
  let mockStore: Store;
  let user:UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    vi.useFakeTimers();
    mockStore = configureStore({ reducer: { TimerSlice } });
    mockStore.dispatch(setInitialValue(5));
    vi.resetAllMocks();
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <SpyDiscuss />
        </BrowserRouter>
      </Provider>
    );
    afterEach(() => {
      vi.useRealTimers();
    });
  });
  it("Should render the countdown timer and button", () => {
    expect(
      screen.getByText(
        "Trong thời gian đếm ngược hãy cùng nhau bàn luận để đoán xem ai là điệp viên nhé!"
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("Should navigate to /reveal after specific time", async () => {
    act(() => {
      vi.advanceTimersByTime(5 * 60 * 1000);
    });
    expect(mockUseNavigate).toBeCalledWith("/reveal");
  });
  it("Should navigate to /reveal after click button", async () => {
    vi.useRealTimers();
    const buttonElement = screen.getByRole("button");
    await user.click(buttonElement);
    expect(mockUseNavigate).toBeCalledWith("/reveal");
  });
});
