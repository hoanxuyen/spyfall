import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SpyTitle from "./SpyTitle";
describe("SpyTitle Component", () => {
  it("Should render the title with the correct label", () => {
    render(<SpyTitle label="Điệp viên hai mang" />);
    expect(screen.getByText("Điệp viên hai mang")).toBeTruthy();
  });
  it("Should apply the correct animation class", () => {
    render(<SpyTitle label="Điệp viên hai mang" animation="animate-bounce" />);
    expect(
      screen
        .getByText("Điệp viên hai mang")
        .classList.contains("animate-bounce")
    ).toBeTruthy();
  });
});
