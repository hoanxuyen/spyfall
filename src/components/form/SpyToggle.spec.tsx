import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SpyToggle from "./SpyToggle";

describe("SpyToggle component", () => {
  const containerWidth = 64;
  const knobSize = 32;
  const onChange = vi.fn();
  it("renders properly", () => {
    render(
      <SpyToggle
        containerWidth={containerWidth}
        knobSize={knobSize}
        onChange={onChange}
        toggled={false}
      />
    );
    const toggleCheckbox = screen.getByRole("checkbox");
    expect(toggleCheckbox).toBeInTheDocument();
    expect(toggleCheckbox).toHaveProperty("checked", false);
  });

  it("handles change event", async () => {
    render(
      <SpyToggle
        containerWidth={containerWidth}
        knobSize={knobSize}
        onChange={onChange}
        toggled={false}
      />
    );
    const toggleCheckbox = screen.getByRole("checkbox");
    await userEvent.click(toggleCheckbox);
    expect(onChange).toHaveBeenCalled();
  });

  it("positions the knob correctly when toggled is false", async () => {
    render(
      <SpyToggle
        containerWidth={containerWidth}
        knobSize={knobSize}
        onChange={onChange}
        toggled={false}
      />
    );
    const toggleCheckbox = screen.getByRole("checkbox");
    await waitFor(() => {
      const knob = toggleCheckbox.nextElementSibling;
      expect(knob).toHaveStyle(
        `transform: translateX(${containerWidth - knobSize}px) translateZ(0)`
      );
    });
  });

  it("positions the knob correctly when toggled is true", async () => {
    render(
      <SpyToggle
        containerWidth={containerWidth}
        knobSize={knobSize}
        onChange={onChange}
        toggled={true}
      />
    );
    const toggleCheckbox = screen.getByRole("checkbox");
    await waitFor(() => {
      const knob = toggleCheckbox.nextElementSibling;
      expect(knob).toHaveStyle(`transform: none`);
    });
  });
  it("applies disabled styles when disabled", () => {
    render(
      <SpyToggle
        containerWidth={containerWidth}
        knobSize={knobSize}
        onChange={onChange}
        toggled={false}
        disabled={true}
      />
    );
    const toggleWrapper = screen.getByRole("checkbox").parentElement;
    expect(toggleWrapper).toHaveClass("cursor-not-allowed");
    expect(toggleWrapper).toHaveClass("opacity-50");
  });
});
