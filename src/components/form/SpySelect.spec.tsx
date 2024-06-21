import { render, screen } from "@testing-library/react";
import SpyForm from "./SpyForm";
import userEvent from "@testing-library/user-event";
import SpySelect from "./SpySelect";
describe("SpySelect Component", () => {
  const onSubmit = vi.fn();
  const user = userEvent.setup();
  const ElementTestIds = {
    label: "formSelectLabel",
    select: "formSelect",
  };
  beforeEach(() => {
    render(
      <SpyForm onSubmit={onSubmit}>
        <SpySelect
          label="Select"
          name="select"
          list={{ 1: "a", 2: "asd", c: "Brotato" }}
        />
        <button type="submit">Submit</button>
      </SpyForm>
    );
  });
  it("Should render the select with the label:Select in the form", () => {
    const labelElement = screen.getByTestId(ElementTestIds.label);
    const selectElement = screen.getByTestId(ElementTestIds.select);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent("Select");
    expect(selectElement).toBeInTheDocument();
  });
  it("Should render the correct list of options", () => {
    const options = screen.getAllByRole("option");
    console.log(options);
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("a");
    expect(options[1]).toHaveTextContent("asd");
    expect(options[2]).toHaveTextContent("Brotato");
  });
  it("Should change the selected option as a user select new option"),
    async () => {
      const selectElement = screen.getByTestId(ElementTestIds.select);
      await user.selectOptions(selectElement, "Brotato");
      expect(selectElement).toHaveValue("Brotato");
    };
  it("Should call onSubmit with option value when the form is submitted", async () => {
    const buttonElement = screen.getByRole("button");
    const selectElement = screen.getByTestId(ElementTestIds.select);
    await user.selectOptions(selectElement, "c");
    await user.click(buttonElement);
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ select: "c" }),
      expect.anything() // expect các params khác có thể do handleSubmit của form truyền vào onSubmit
    );
  });
});
