import { render, screen } from "@testing-library/react";
import SpyLobbyForm from "./SpyLobbyForm";
import userEvent from "@testing-library/user-event";
import { ElementTestIds } from "../SpyUlt";
import { Provider } from "react-redux";
import { store } from "../store/store";

describe("SpyLobbyForm Component", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SpyLobbyForm />
      </Provider>
    );
  });
  it("Should render the form with numberOfPlayers input and timer select", () => {
    expect(screen.getByTestId(ElementTestIds.input)).toBeTruthy();
    expect(screen.getByTestId(ElementTestIds.select)).toBeTruthy();
  });
  it("Should have default value as numberOfPlayers is 4 and timer select is 5", () => {
    const form = screen.getByTestId("spyLobbyFormID");
    expect(form).toHaveFormValues({
      numberOfPlayers: 4,
      timer: "5",
    });
  });
  it("Should show error if numberOfPlayers is less than 3", async () => {
    const inputElement = screen.getByTestId(ElementTestIds.input);
    const button = screen.getByRole("button");
    await user.clear(inputElement);
    await user.type(inputElement, "2");
    await user.click(button);
    const errorElement = screen.getByTestId(ElementTestIds.error);
    expect(errorElement).toBeInTheDocument();
  });
  it("Should change the value of input and select when i change", async () => {
    const inputElement = screen.getByTestId(ElementTestIds.input);
    const selectElement = screen.getByTestId(ElementTestIds.select);
    const form = screen.getByTestId(ElementTestIds.form);
    await user.clear(inputElement);
    await user.type(inputElement, "6");
    await user.selectOptions(selectElement, "15 phút");
    expect(form).toHaveFormValues({
      numberOfPlayers: 6,
      timer: "15",
    });
  });
});
