import { render, screen } from "@testing-library/react";
import FormContainer from "./FormContainer";
import userEvent from "@testing-library/user-event";
import FormTextInput from "./FormTextInput";

describe("FormNumberInput Component", () => {
  it("should render the input and label in the form", () => {
    render(
      <FormContainer onSubmit={vi.fn()}>
        <FormTextInput
          label="Label"
          name="test"
          type="number"
          rules={{ required: "Error" }}
        />
      </FormContainer>
    );

    const inputElement = screen.getByTestId("formInputElement");
    const labelElement = screen.getByTestId("formInputLabel");

    expect(labelElement).toHaveTextContent("Label");
    expect(inputElement).toBeInTheDocument();
  });

  it("should show error message on submit when input is empty", async () => {
    const onSubmit = vi.fn();
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

    const buttonElement = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(buttonElement);

    const errorElement = screen.getByTestId("formInputError");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent("Error");
  });

  it("should call onSubmit function when the form is submitted", async () => {
    const onSubmit = vi.fn();
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
    const inputElement = screen.getByTestId("formInputElement");
    const buttonElement = screen.getByRole("button");
    const user = userEvent.setup();
    await user.type(inputElement, "123");
    await user.click(buttonElement);
    expect(onSubmit).toHaveBeenCalled();
  });
});
