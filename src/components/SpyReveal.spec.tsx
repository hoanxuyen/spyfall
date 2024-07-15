import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SpyReveal from "./SpyReveal";
import PlayerSlice, { assignSpy } from "../features/PlayerSlice";
import ModalSlice from "../features/ModalSlice";
import { vi } from "vitest";
import { ElementTestIds } from "../SpyUlt";
vi.mock("react-confetti", () => {
  return {
    __esModule: true,
    default: () => <div>Confetti</div>,
  };
});
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useNavigate: () => mockNavigate,
  };
});
describe("SpyReveal component", () => {
  const user = userEvent.setup();

  const factory = () => {
    const store = configureStore({
      reducer: { PlayerSlice, ModalSlice },
    });
    store.dispatch(assignSpy(0));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SpyReveal />
        </BrowserRouter>
      </Provider>
    );

    const spyOnDispatch = vi.spyOn(store, "dispatch");
    return { store, spyOnDispatch };
  };

  it("Should render properly", () => {
    factory();

    expect(
      screen.getByText("Chúc mừng bạn đã đoán ra được số 1 chính là điệp viên")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Nếu chưa đoán ra được thì bạn có muốn thử lại không?")
    ).toBeInTheDocument();
    expect(screen.getByText("Có")).toBeInTheDocument();
    expect(screen.getByText("Không")).toBeInTheDocument();
  });

  it("Should open modal when 'Có' button is clicked", async () => {
    factory();
    const yesButton = screen.getByText("Có");
    await user.click(yesButton);
    expect(screen.getByTestId(ElementTestIds.modal)).toBeInTheDocument();
  });
});
