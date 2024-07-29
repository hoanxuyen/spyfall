import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SpyToggle from "./SpyToggle";
import { ElementTestIds } from "../../SpyUlt";

describe("SpyToggle component", () => {
  const themeToggleButtonSize = 12;
  const containerWidth = 48;
  const containerHeight = 24;
  const onChange = vi.fn();
  const user = userEvent.setup();
  it("renders properly", () => {
    render(
      <SpyToggle
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        knobSize={themeToggleButtonSize}
        onChange={onChange}
        toggled={false}
      />
    );
    const toggle = screen.getByTestId(ElementTestIds.toggle);
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveStyle({
      width: `${containerWidth}px`,
      height: `${containerHeight}px`,
    });
  });
  it("Should call onChange when clicked", async () => {
    render(
      <SpyToggle
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        knobSize={themeToggleButtonSize}
        onChange={onChange}
        toggled={false}
      />
    );
    const toggle = screen.getByTestId(ElementTestIds.toggle);
    await user.click(toggle);
    expect(onChange).toHaveBeenCalled();
  });
  it("Should have `cursor-not-allowed` class the style if disabled", () => {
    render(
      <SpyToggle
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        knobSize={themeToggleButtonSize}
        onChange={onChange}
        toggled={false}
        disabled={true}
      />
    );
    const toggle = screen.getByTestId(ElementTestIds.toggle);
    expect(toggle).toHaveClass("cursor-not-allowed");
  });
  it("Should have correct postion when toggled is false", () => {
    render(
      <SpyToggle
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        knobSize={themeToggleButtonSize}
        onChange={onChange}
        toggled={false}
      />
    );
    const toggle = screen.getByTestId(ElementTestIds.toggle);
    expect(toggle).toHaveClass("justify-end");
  });
  it("Should have correct postion when toggled is true", () => {
    render(
      <SpyToggle
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        knobSize={themeToggleButtonSize}
        onChange={onChange}
        toggled={true}
      />
    );
    const toggle = screen.getByTestId(ElementTestIds.toggle);
    expect(toggle).toHaveClass("justify-start");
  });
});
