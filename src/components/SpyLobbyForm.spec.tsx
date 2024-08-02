import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SpyLobbyForm from "./SpyLobbyForm";
import { render, screen, waitFor } from "@testing-library/react";
import PlayerSlice, {
  assignLocation,
  assignSpy,
  LocationSource,
  resetPlayers,
  setInitialPlayer,
  showOption,
  updateCustomLocations,
} from "../features/PlayerSlice";
import { ElementTestIds } from "../SpyUlt";
import TimerSlice, { setInitialValue } from "../features/TimerSlice";
import { act } from "react";
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

describe("SpyLobbyForm Component", () => {
  const user = userEvent.setup();
  const factory = (
    locationSource = LocationSource.DEFAULT,
    customLocations = ["Location 1", "Location 2", "Location 3"]
  ) => {
    //@ts-expect-error ignore this
    window.scrollTo = vi.fn();
    const store = configureStore({
      reducer: { PlayerSlice, TimerSlice },
      preloadedState: {
        PlayerSlice: {
          locations: [
            { name: "Địa điểm có sẵn 1", description: "", image: "" },
            { name: "Địa điểm có sẵn 2", description: "", image: "" },
            { name: "Địa điểm có sẵn 3", description: "", image: "" },
          ],
          customLocations: customLocations,
          locationsOption: locationSource,
          value: 4,
          spyIndex: null,
          location: null,
          currentPlayerIndex: 0,
          ready: false,
        },
        TimerSlice: {
          value: 300,
        },
      },
    });
    const spyOnDispatch = vi.spyOn(store, "dispatch");
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SpyLobbyForm />
        </BrowserRouter>
      </Provider>
    );
    afterEach(() => {
      mockUseNavigate.mockRestore();
    });
    return { store, spyOnDispatch };
  };

  it("Should render input, radio, select,submit button", async () => {
    factory();
    const radioButtons = screen.getAllByRole("radio");
    expect(screen.getByTestId(ElementTestIds.input)).toBeInTheDocument();
    expect(screen.getByTestId(ElementTestIds.select)).toBeInTheDocument();
    expect(radioButtons[0]).toBeInTheDocument(); // have at least 1 radio button
    expect(screen.getByText("Bắt đầu trò chơi")).toBeInTheDocument(); //submit button
  });
  it(`Should have default value as numberOfPlayers is 4 , timer select is 5, locationOption is ${LocationSource.DEFAULT}`, () => {
    factory();
    const form = screen.getByTestId(ElementTestIds.form);
    expect(form).toHaveFormValues({
      numberOfPlayers: 4,
      timer: "5",
      locationOption: LocationSource.DEFAULT,
    });
  });
  it("Should show error if numberOfPlayers is less than 3", async () => {
    factory();
    const inputElement = screen.getByTestId(ElementTestIds.input);
    const button = screen.getByText("Bắt đầu trò chơi");
    await user.clear(inputElement);
    await user.type(inputElement, "2");
    await user.click(button);
    const errorElement = screen.getByTestId(ElementTestIds.error);
    expect(errorElement).toBeInTheDocument();
  });

  it("Should show error if user select `tự tạo` and submit without add custom location", async () => {
    factory(LocationSource.CUSTOM, []);
    const button = screen.getByText("Bắt đầu trò chơi");
    await act(async () => {
      await user.click(button);
    });
    await waitFor(() => {
      const errorElement = screen.getByText("Không được để trống địa điểm");
      expect(errorElement).toBeInTheDocument();
    });
  });

  it("Should change the value of input , select, radio when change", async () => {
    factory();
    const inputElement = screen.getByTestId(ElementTestIds.input);
    const selectElement = screen.getByTestId(ElementTestIds.select);
    const tutaoRadio = screen.getByLabelText("Tự tạo");
    const form = screen.getByTestId(ElementTestIds.form);
    await user.clear(inputElement);
    await user.type(inputElement, "6");
    await user.selectOptions(selectElement, "15 phút");
    await user.click(tutaoRadio);
    expect(form).toHaveFormValues({
      numberOfPlayers: 6,
      timer: "15",
      locationOption: LocationSource.CUSTOM,
    });
  });
  it(`should show location input if location source is ${LocationSource.COMBINE}`, () => {
    factory(LocationSource.COMBINE);
    const input = screen.getByTestId(ElementTestIds.inputWithBtn);
    expect(input).toBeInTheDocument();
  });
  it(`should show location input if location source is ${LocationSource.CUSTOM}`, () => {
    factory(LocationSource.CUSTOM);
    const input = screen.getByTestId(ElementTestIds.inputWithBtn);
    expect(input).toBeInTheDocument();
  });

  it("Should navigate to /roles after hitting submit button", async () => {
    factory();
    const inputElement = screen.getByTestId(ElementTestIds.input);
    const button = screen.getByText("Bắt đầu trò chơi");
    await user.clear(inputElement);
    await user.type(inputElement, "4");
    await user.click(button);
    expect(mockUseNavigate).toHaveBeenCalledWith("/roles");
    mockUseNavigate.mockRestore();
  });
  it("Should dispatch some actions after hitting submit button", async () => {
    const { spyOnDispatch } = factory();
    const button = screen.getByText("Bắt đầu trò chơi");
    await act(async () => {
      await user.click(button);
    });
    expect(spyOnDispatch).toHaveBeenCalledTimes(6);
    expect(spyOnDispatch).toHaveBeenNthCalledWith(1, resetPlayers());
    expect(spyOnDispatch).toHaveBeenNthCalledWith(2, setInitialValue(5));
    expect(spyOnDispatch).toHaveBeenNthCalledWith(3, setInitialPlayer(4));
    expect(spyOnDispatch).toHaveBeenNthCalledWith(4, assignSpy(4));
    expect(spyOnDispatch).toHaveBeenNthCalledWith(
      5,
      showOption(LocationSource.DEFAULT)
    );
    expect(spyOnDispatch).toHaveBeenNthCalledWith(6, assignLocation());
  });
  it("Should add new customsLocation when clicking `+` button from the InputwithBtn", async () => {
    const { spyOnDispatch } = factory(LocationSource.CUSTOM, []);
    const inputWithBtn = screen.getByTestId(ElementTestIds.inputWithBtn);
    await user.clear(inputWithBtn);
    await user.type(inputWithBtn, "foo");
    const plusButton = screen.getByText("+");
    await user.click(plusButton);
    expect(spyOnDispatch).toHaveBeenCalledWith(
      updateCustomLocations([...[], "foo"])
    );
  });
  it("Should not add new customLocation when clicking `+` button if the input contains empty string", async () => {
    const { spyOnDispatch } = factory(LocationSource.CUSTOM, []);
    const inputWithBtn = screen.getByTestId(ElementTestIds.inputWithBtn);
    await user.clear(inputWithBtn);
    await user.type(inputWithBtn, " ");
    const plusButton = screen.getByText("+");
    await user.click(plusButton);
    expect(spyOnDispatch).not.toHaveBeenCalled();
  });
});
