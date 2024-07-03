import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SpyTitle from "./SpyTitle";
import { BrowserRouter } from "react-router-dom";
describe("SpyTitle Component", () => {
  it("Should render the title with the correct label", () => {
    render(
      <BrowserRouter>
        <SpyTitle label="Điệp viên hai mang" />
      </BrowserRouter>
    );
    expect(screen.getByText("Điệp viên hai mang")).toBeTruthy();
  });
  it("Should apply the correct animation class", () => {
    render(
      <BrowserRouter>
        <SpyTitle label="Điệp viên hai mang" animation="animate-bounce" />
      </BrowserRouter>
    );
    expect(
      screen
        .getByText("Điệp viên hai mang")
        .classList.contains("animate-bounce")
    ).toBeTruthy();
  });
});
