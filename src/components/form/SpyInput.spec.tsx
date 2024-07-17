import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SpyForm from "./SpyForm";
import SpyInput from "./SpyInput";
import { ElementTestIds } from "../../SpyUlt";

describe("FormNumberInput Component", () => {
  const onSubmit = vi.fn();
  const user = userEvent.setup();
  const onChange = vi.fn();
  const onClick = vi.fn();
  beforeEach(() => {
    render(
      <SpyForm onSubmit={onSubmit}>
        <SpyInput
          label="Label"
          name="test"
          type="number"
          rules={{ required: "Error" }}
        />
        <SpyInput
          name="withButton"
          type="text"
          buttonLabel="+"
          onChange={onChange}
          onClick={onClick}
          placeholder="withButton"
          value="test"
        />
        <button type="submit">Submit</button>
      </SpyForm>
    );
  });

  it("should render inputs and label in the form", () => {
    const inputElement = screen.getByTestId(ElementTestIds.input);
    const formInputWithBtn = screen.getByTestId(ElementTestIds.inputWithBtn);
    const labelElement = screen.getByTestId(ElementTestIds.label);

    expect(labelElement).toHaveTextContent("Label");
    expect(inputElement).toBeInTheDocument();
    expect(formInputWithBtn).toBeInTheDocument();
  });

  it("should show error message on submit when input is empty", async () => {
    const sumbitBtn = screen.getByText("Submit");
    await user.click(sumbitBtn);

    const errorElement = screen.getByTestId(ElementTestIds.error);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent("Error");
  });
  it("Should call onClick when hitting `Enter` in inputWithBtn", async () => {
    const formInputWithBtn = screen.getByTestId(ElementTestIds.inputWithBtn);
    await user.clear(formInputWithBtn);
    await user.type(formInputWithBtn, "abc");
    await user.type(formInputWithBtn, "{Enter}");
    expect(onClick).toHaveBeenCalled();
  });
  it("Should call onChange when changing inputWithBtn value", async () => {
    const formInputWithBtn = screen.getByTestId(ElementTestIds.inputWithBtn);
    await user.clear(formInputWithBtn);
    await user.type(formInputWithBtn, "abc");
    expect(onChange).toHaveBeenCalled();
  });
  it("Should call onClick when hitting button in inputWithBtn", async () => {
    const formInputWithBtn = screen.getByTestId(ElementTestIds.inputWithBtn);
    await user.clear(formInputWithBtn);
    await user.type(formInputWithBtn, "abc");
    const buttonElement = screen.getByText("+");
    await user.click(buttonElement);
    expect(onClick).toHaveBeenCalled();
  });
  it("should call onSubmit function when the form is submitted", async () => {
    const inputElement = screen.getByTestId(ElementTestIds.input);
    const sumbitBtn = screen.getByText("Submit");

    await user.type(inputElement, "123");
    await user.click(sumbitBtn);

    expect(onSubmit).toHaveBeenCalled();
  });
});
