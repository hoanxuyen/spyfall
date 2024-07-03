import { render, screen } from "@testing-library/react";
import SpyLobbyForm from "./SpyLobbyForm";
import userEvent from "@testing-library/user-event";
import { ElementTestIds } from "../SpyUlt";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { BrowserRouter } from "react-router-dom";

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
// @ts-expect-error ignore
window.scrollTo = vi.fn();
describe("SpyLobbyForm Component", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SpyLobbyForm />
        </BrowserRouter>
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
    const button = screen.getByText("Bắt đầu trò chơi");
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
  it("Should redirect to /roles after hitting submit", async () => {
    const inputElement = screen.getByTestId(ElementTestIds.input);
    const button = screen.getByText("Bắt đầu trò chơi");
    await user.clear(inputElement);
    await user.type(inputElement, "4");
    await user.click(button);
    expect(mockUseNavigate).toHaveBeenCalledWith("/roles");
  });
});
