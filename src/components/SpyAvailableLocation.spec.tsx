import { configureStore, Store } from "@reduxjs/toolkit";
import PlayerSlice, {
  LocationSource,
} from "../features/PlayerSlice";
import { Provider } from "react-redux";
import SpyAvailableLocation from "./SpyAvailableLocation";
import { render, screen} from "@testing-library/react";

describe("SpyAvailableLocation component", () => {
  let mockStore: Store;
  const initialState = {
    PlayerSlice: {
      locations: ["Vòng xoay Lăng Cha Cả", "Maximark Cộng Hoà", "Hồ Con Rùa"],
      customLocations: [],
      locationsOption: LocationSource.DEFAULT,
      value: 4,
      spyIndex: null,
      location: null,
      currentPlayerIndex: 0,
      ready: false,
    },
  };
  beforeEach(() => {
    mockStore = configureStore({
      reducer: { PlayerSlice },
      preloadedState: initialState,
    });
    mockStore.dispatch = vi.fn();
    render(
      <Provider store={mockStore}>
        <SpyAvailableLocation />
      </Provider>
    );
  });
  it("Should render initial list of locations", () => {
    expect(screen.getByText("Vòng xoay Lăng Cha Cả")).toBeInTheDocument();
    expect(screen.getByText("Maximark Cộng Hoà")).toBeInTheDocument();
    expect(screen.getByText("Hồ Con Rùa")).toBeInTheDocument();
  });
  // it(`Should remove a location when "X" button is clicked`, async () => {
  //   const removeButtons = screen.getAllByText("X");
  //   await user.click(removeButtons[0]);
  //   await waitFor(() => {
  //     expect(
  //       screen.queryByText("Vòng xoay Lăng Cha Cả")
  //     ).not.toBeInTheDocument();
  //   });
  //   expect(mockStore.dispatch).toHaveBeenCalledWith(
  //     updateLocations(["Maximark Cộng Hoà", "Hồ Con Rùa"])
  //   );
  // });
  // it("Should dispatch updateLocations action when a location is removed", async () => {
  //   const removeButtons = screen.getAllByText("X");
  //   await user.click(removeButtons[0]);
  //   expect(mockStore.dispatch).toHaveBeenCalledWith(
  //     updateLocations(["Maximark Cộng Hoà", "Hồ Con Rùa"])
  //   );
  // });
});
