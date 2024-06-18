import classNames from "classnames";
import { ReactElement } from "react";
import { SpyHeadingProp } from "./SpyHeadingType";

export default function SpyHeadings({ text, className, type }: SpyHeadingProp) {
  let HeadingTag: ReactElement | null = null;

  switch (type) {
    case "h1":
      HeadingTag = (
        <h1 className={classNames("text-white", className)}>{text}</h1>
      );
      break;
    case "h2":
      HeadingTag = (
        <h2 className={classNames("text-white", className)}>{text}</h2>
      );
      break;
    case "h3":
      HeadingTag = (
        <h3 className={classNames("text-white", className)}>{text}</h3>
      );
      break;
    case "h4":
      HeadingTag = (
        <h4 className={classNames("text-white", className)}>{text}</h4>
      );
      break;
    case "h5":
      HeadingTag = (
        <h5 className={classNames("text-white", className)}>{text}</h5>
      );
      break;
    case "h6":
      HeadingTag = (
        <h6 className={classNames("text-white", className)}>{text}</h6>
      );
      break;
  }

  return HeadingTag;
}
