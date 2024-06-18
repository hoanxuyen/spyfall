import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SpyHeadings from "./SpyHeading";
import { SpyHeadingType } from "./SpyHeadingType";

describe("Spy Headings", () => {
  it.each`
    type                 | expectedTag | text           | className
    ${SpyHeadingType.h1} | ${`H1`}     | ${`Heading 1`} | ${`text-white custom-class`}
    ${SpyHeadingType.h2} | ${`H2`}     | ${`Heading 2`} | ${`text-white custom-class2`}
    ${SpyHeadingType.h3} | ${`H3`}     | ${`Heading 3`} | ${`text-white custom-class3`}
    ${SpyHeadingType.h4} | ${`H4`}     | ${`Heading 4`} | ${`text-white custom-class4`}
    ${SpyHeadingType.h5} | ${`H5`}     | ${`Heading 5`} | ${`text-white custom-class5`}
    ${SpyHeadingType.h6} | ${`H6`}     | ${`Heading 6`} | ${`text-white custom-class6`}
  `(
    "Should render element tag $expectedTag with text: $text and have class: $className",
    ({ type, text, className, expectedTag }) => {
      render(<SpyHeadings text={text} type={type} className={className} />);
      const heading = screen.getByText(text);
      expect(heading).toBeTruthy();
      expect(heading.classList.contains("text-white custom-class"));
      expect(heading.tagName).toBe(expectedTag);
    }
  );
});
