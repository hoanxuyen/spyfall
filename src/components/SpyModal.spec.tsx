import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "../features/ModalSlice";
import { Provider } from "react-redux";
import SpyModal from "./SpyModal";
import { act, render, screen, waitFor } from "@testing-library/react";
import { ElementTestIds } from "../SpyUlt";
import userEvent from "@testing-library/user-event";

describe("SpyModal Component", () => {
  const user = userEvent.setup();
  const factory = (isOpen = true) => {
    const store = configureStore({
      reducer: {
        ModalSlice,
      },
      preloadedState: {
        ModalSlice: { isOpen },
      },
    });
    render(
      <Provider store={store}>
        <SpyModal>Modal Content</SpyModal>
      </Provider>
    );
    return { store };
  };

  it("Should render correctly when open", () => {
    factory();
    expect(screen.getByTestId(ElementTestIds.modal)).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("Should close when escape key is pressed", async () => {
    factory();
    await act(async () => {
      await user.keyboard("{Escape}");
    });
    await waitFor(() => {
      expect(
        screen.queryByTestId(ElementTestIds.modal)
      ).not.toBeInTheDocument();
    });
  });

  it("Should close when clicking on the backdrop", async () => {
    factory();
    const backdropElement = screen.getByTestId(ElementTestIds.modalBackdrop);
    await act(async () => {
      await user.click(backdropElement);
    });
    await waitFor(() => {
      expect(
        screen.queryByTestId(ElementTestIds.modal)
      ).not.toBeInTheDocument();
    });
  });
  it("Should not close when clicking inside the modal content", async () => {
    factory();
    const modalContent = screen.getByText("Modal Content");
    await user.click(modalContent);
    expect(screen.getByTestId(ElementTestIds.modal)).toBeInTheDocument();
  });
});
