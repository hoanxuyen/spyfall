import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SpyHeadingType } from "./SpyHeadingType";
import SpyHeading from "./SpyHeading";

describe("SpyHeading2 Component", () => {
  it.each`
    type                 | expectedTag | text           | restProps
    ${SpyHeadingType.h1} | ${"H1"}     | ${"Heading 1"} | ${{ className: "header-1" }}
    ${SpyHeadingType.h2} | ${"H2"}     | ${"Heading 2"} | ${{ className: "custom-class" }}
    ${SpyHeadingType.h3} | ${"H3"}     | ${"Heading 3"} | ${{ id: "unique-id" }}
    ${SpyHeadingType.h4} | ${"H4"}     | ${"Heading 4"} | ${{ style: { height: "50px" } }}
    ${SpyHeadingType.h5} | ${"H5"}     | ${"Heading 5"} | ${{ className: "header-1" }}
    ${SpyHeadingType.h6} | ${"H6"}     | ${"Heading 6"} | ${{ className: "header-1" }}
  `(
    "renders $expectedTag with text:$text and additional props:$restProps",
    ({ type, expectedTag, text, restProps }) => {
      render(<SpyHeading type={type} text={text} {...restProps} />);
      const heading = screen.getByText(text);
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe(expectedTag);
      //Check xem có đúng class không
      if (restProps.className) {
        expect(heading).toHaveClass(restProps.className);
      }
      //check giá trị id
      if (restProps.id) {
        expect(heading).toHaveAttribute("id", restProps.id);
      }
      //Check có đúng style không
      if (restProps.style) {
        Object.entries(restProps.style).forEach(([key, value]) => {
          expect(heading).toHaveStyle(`${key}:${value}`);
        });
      }
    }
  );

  it("renders null for an invalid type", () => {
    const { container } = render(
      // @ts-expect-error trường hợp user cho type khác h1,... vào type
      <SpyHeading type="asdjzxkcl" text="Invalid Heading" />
    );
    expect(container.firstChild).toBeNull();
  });
});
