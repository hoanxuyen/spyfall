import { Store, configureStore } from "@reduxjs/toolkit";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import PlayerSlice, {
  setInitialPlayer,
  setReady,
  assignSpy,
} from "../features/PlayerSlice";
import { beforeEach, describe, expect, it } from "vitest";
import { ElementTestIds } from "../SpyUlt";
import userEvent from "@testing-library/user-event";
import SpyAnnounceRole from "./SpyAnnounceRole";
describe("PreviewPlayer component", () => {
  let mockStore: Store;
  const user = userEvent.setup();
  beforeEach(() => {
    mockStore = configureStore({ reducer: { PlayerSlice } });
    mockStore.dispatch(setInitialPlayer(4));
    render(
      <Provider store={mockStore}>
        <SpyAnnounceRole />
      </Provider>
    );
  });

  it("renders ReadyComponent when not ready", () => {
    expect(screen.getByText("Đã sẵn sàng")).toBeInTheDocument();
  });
  it("render SpyComponent when ready and current player is spy", () => {
    act(() => {
      mockStore.dispatch(setReady(true));
      mockStore.dispatch(assignSpy(0));
    });
    expect(screen.getByText("Oke")).toBeInTheDocument(); // check đã trong state ready
    expect(screen.getByTestId(ElementTestIds.spyLabel)).toBeInTheDocument(); // check đúng spy component
  });
  it("Should render PlayerComponent when ready and current player is not spy", () => {
    act(() => {
      mockStore.dispatch(setReady(true)); // set cho state ready
    });
    expect(screen.getByTestId(ElementTestIds.playerLabel)).toBeInTheDocument(); // check đúng playerComponent
  });
  it(`should change state to ready when click "Đã sẵn sàng" button`, async () => {
    await act(async () => {
      await user.click(screen.getByRole("button"));
    });
    expect(mockStore.getState().PlayerSlice.ready).toBe(true);
  });
  it(`Should dispatch nextPlayer and setReady(false) when "Oke" button is clicked`, async () => {
    act(() => {
      mockStore.dispatch(setReady(true));
    });

    const state = mockStore.getState().PlayerSlice;
    await act(async () => {
      await user.click(screen.getByRole("button"));
    });
    const newState = mockStore.getState().PlayerSlice;
    expect(newState.ready).toBe(false);
    expect(newState.currentPlayerIndex).toBe(state.currentPlayerIndex + 1);
  });
});
