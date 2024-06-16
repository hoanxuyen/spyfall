import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SpyButton from "./SpyButton";
import { SpyButtonSize } from "./SpyButtonType";
import { Color } from "../theme";

describe("Spy Button", () => {
  it("should render the button", async () => {
    const onClickTest = vi.fn();

    render(
      <SpyButton
        label="Test"
        size={SpyButtonSize.MD}
        color={Color.Primary}
        onClick={onClickTest}
      />
    );

    expect(screen.getByRole("button")).toBeTruthy();
  });
  /**
   * Manual Version 
  it("should have the correct color class when color is primary", () => {
    render(
      <SpyButton
        label="Test"
        size={SpyButtonSize.MD}
        color={Color.Primary}
        onClick={() => {}}
      />
    );
    expect(
      screen.getByRole("button").classList.contains("bg-primary")
    ).toBeTruthy();
    expect(
      screen.getByRole("button").classList.contains("text-dark")
    ).toBeTruthy();
  });
   */
  // Fast
  it.each`
    color              | expected
    ${Color.Primary}   | ${["bg-primary", "text-dark"]}
    ${Color.Secondary} | ${["bg-secondary", "text-white"]}
    ${Color.Dark}      | ${["bg-dark", "text-white"]}
  `(
    "should have the correct color class when color is $color",
    ({ color, expected }) => {
      render(
        <SpyButton
          label="Test"
          size={SpyButtonSize.MD}
          color={color}
          onClick={() => {}}
        />
      );
      for (const className of expected) {
        expect(
          screen.getByRole("button").classList.contains(className)
        ).toBeTruthy();
      }
    }
  );

  it.each`
    size                | expected
    ${SpyButtonSize.SM} | ${["p-2"]}
    ${SpyButtonSize.MD} | ${["p-3"]}
    ${SpyButtonSize.LG} | ${["p-4"]}
    ${SpyButtonSize.XL} | ${["p-5"]}
  `(
    "should have the correct color class when color is $color",
    ({ size, expected }) => {
      render(
        <SpyButton
          label="Test"
          size={size}
          color={Color.Primary}
          onClick={() => {}}
        />
      );
      for (const className of expected) {
        expect(
          screen.getByRole("button").classList.contains(className)
        ).toBeTruthy();
      }
    }
  );
});
