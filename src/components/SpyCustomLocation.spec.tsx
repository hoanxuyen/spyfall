import { configureStore, Store } from "@reduxjs/toolkit";
import PlayerSlice, { LocationSource } from "../features/PlayerSlice";
import { Provider } from "react-redux";
import SpyCustomLocation from "./SpyCustomLocation";
import { render, screen } from "@testing-library/react";
describe("SpyCustomLocation component", () => {
  let store: Store;
  const initialState = {
    PlayerSlice: {
      locations: [],
      customLocations: ["Location 1", "Location 2", "Location 3"],
      locationsOption: LocationSource.CUSTOM,
      value: 4,
      spyIndex: null,
      location: null,
      currentPlayerIndex: 0,
      ready: false,
    },
  };
  beforeEach(() => {
    store = configureStore({
      reducer: { PlayerSlice },
      preloadedState: initialState,
    });
    store.dispatch = vi.fn();
    render(
      <Provider store={store}>
        <SpyCustomLocation />
      </Provider>
    );
  });

  it("Should render initial list of custom locations", () => {
    expect(screen.getByText("Location 1")).toBeInTheDocument();
    expect(screen.getByText("Location 2")).toBeInTheDocument();
    expect(screen.getByText("Location 3")).toBeInTheDocument();
  });

  it("Should display message when no custom locations are available", () => {
    const emptyState = {
      PlayerSlice: {
        ...initialState.PlayerSlice,
        customLocations: [],
      },
    };
    store = configureStore({
      reducer: { PlayerSlice },
      preloadedState: emptyState,
    });
    render(
      <Provider store={store}>
        <SpyCustomLocation />
      </Provider>
    );
    expect(
      screen.getByText("Chưa có địa điểm được thêm vào.")
    ).toBeInTheDocument();
  });
  // it("Should removes a location when clicking `X` button", async () => {
  //   const removeButtons = screen.getAllByText("X");
  //   await user.click(removeButtons[0]);
  //   expect(store.dispatch).toHaveBeenCalledWith(
  //     updateCustomLocations(["Location 2", "Location 3"])
  //   );
  // });
});
