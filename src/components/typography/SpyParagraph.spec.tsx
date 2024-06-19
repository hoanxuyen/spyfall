import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SpyParagraph from "./SpyParagraph";
describe("SpyParagraph component", () => {
  it("Should render text with additional props", () => {
    render(
      <SpyParagraph
        text="Hello world"
        className="custom-class"
        id="custom-id"
        style={{ fontSize: "12px" }}
      />
    );
    screen.debug();
    const paragraphElement = screen.getByText("Hello world");
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveClass("custom-class");
    expect(paragraphElement).toHaveAttribute("id", "custom-id");
    expect(paragraphElement).toHaveStyle("font-size: 12px");
  });
});
