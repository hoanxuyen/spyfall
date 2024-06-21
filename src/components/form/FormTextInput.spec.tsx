import { render, screen } from "@testing-library/react";
import FormContainer from "./FormContainer";
import userEvent from "@testing-library/user-event";
import FormTextInput from "./FormTextInput";

describe("FormNumberInput Component", () => {
  const onSubmit = vi.fn();
  const user = userEvent.setup();
  const ElementTestIds = {
    input: "formInputElement",
    label: "formInputLabel",
    error: "formInputError",
  };
  beforeEach(() => {
    render(
      <FormContainer onSubmit={onSubmit}>
        <FormTextInput
          label="Label"
          name="test"
          type="number"
          rules={{ required: "Error" }}
        />
        <button type="submit">Submit</button>
      </FormContainer>
    );
  });

  it("should render the input and label in the form", () => {
    const inputElement = screen.getByTestId(ElementTestIds.input);
    const labelElement = screen.getByTestId(ElementTestIds.label);

    expect(labelElement).toHaveTextContent("Label");
    expect(inputElement).toBeInTheDocument();
  });

  it("should show error message on submit when input is empty", async () => {
    const buttonElement = screen.getByRole("button");
    await user.click(buttonElement);

    const errorElement = screen.getByTestId(ElementTestIds.error);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent("Error");
  });

  it("should call onSubmit function when the form is submitted", async () => {
    const inputElement = screen.getByTestId(ElementTestIds.input);
    const buttonElement = screen.getByRole("button");

    await user.type(inputElement, "123");
    await user.click(buttonElement);

    expect(onSubmit).toHaveBeenCalled();
  });
});
