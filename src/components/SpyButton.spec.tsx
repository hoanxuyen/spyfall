import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SpyButton from "./SpyButton";
import { SpyButtonSize } from "./SpyButtonType";
import { Color } from "../theme";
import userEvent from "@testing-library/user-event";

describe("SpyButton Component", () => {
  const user = userEvent.setup();
  it("should render the button", () => {
    const onClickTest = vi.fn();

    render(
      <SpyButton
        label="Test"
        size={SpyButtonSize.MD}
        color={Color.Primary}
        onClick={onClickTest}
      />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call onClick handler when clicked", async () => {
    const onClickTest = vi.fn();

    render(
      <SpyButton
        label="Test"
        size={SpyButtonSize.MD}
        color={Color.Primary}
        onClick={onClickTest}
      />
    );

    const button = screen.getByRole("button");
    await user.click(button);
    expect(onClickTest).toHaveBeenCalled();
  });

  it.each`
    color              | expected
    ${Color.Primary}   | ${["bg-primary", "text-dark"]}
    ${Color.Secondary} | ${["bg-secondary", "text-white"]}
    ${Color.Dark}      | ${["bg-dark", "text-white"]}
  `(
    "should have the correct color classes when color is $color",
    ({ color, expected }) => {
      render(
        <SpyButton
          label="Test"
          size={SpyButtonSize.MD}
          color={color}
          onClick={() => {}}
        />
      );
      const button = screen.getByRole("button");
      for (const className of expected) {
        expect(button).toHaveClass(className);
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
    "should have the correct size classes when size is $size",
    ({ size, expected }) => {
      render(
        <SpyButton
          label="Test"
          size={size}
          color={Color.Primary}
          onClick={() => {}}
        />
      );
      const button = screen.getByRole("button");
      for (const className of expected) {
        expect(button).toHaveClass(className);
      }
    }
  );

  it("should have the correct type attribute when type is provided", () => {
    const onClickTest = vi.fn();

    render(
      <SpyButton
        label="Test"
        size={SpyButtonSize.MD}
        color={Color.Primary}
        onClick={onClickTest}
        type="submit"
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });
  it("should have the customClass class when provided", () => {
    render(
      <SpyButton
        label="Test"
        size={SpyButtonSize.MD}
        color={Color.Primary}
        customClass="text-black"
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-black");
  });
});
