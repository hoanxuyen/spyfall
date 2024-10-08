import { configureStore, Store } from "@reduxjs/toolkit";
import PlayerSlice, {
  LocationSource,
  removeLocation,
} from "../features/PlayerSlice";
import { Provider } from "react-redux";
import SpyAvailableLocation from "./SpyAvailableLocation";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SpyAvailableLocation component", () => {
  let mockStore: Store;
  const initialState = {
    PlayerSlice: {
      locations: [
        { name: "Vòng xoay Lăng Cha Cả", description: "", image: "" },
        { name: "Maximark Cộng Hoà", description: "", image: "" },
        { name: "Hồ Con Rùa", description: "", image: "" },
      ],
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
  it("Should dispatch removeLocation action when removebutton is clicked", async () => {
    const user = userEvent.setup();
    const removeButtons = screen.getAllByText("X");
    await user.click(removeButtons[0]);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeLocation({ locationSource: LocationSource.DEFAULT, index: 0 })
    );
  });
});
