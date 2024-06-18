import { ReactHTML } from "react";
import { SpyHeadingProps, SpyHeadingType } from "./SpyHeadingType";

export default function SpyHeading({ text, type, ...rest }: SpyHeadingProps) {
  if (Object.values(SpyHeadingType).includes(type)) {
    const HeadingTag = type as keyof ReactHTML; // ReactHTML dành cho các element cơ bản của HTML(div,span,p,h1,a,...) và JSX.IntrinsicElements cũng có thể dành cho HTML elements hoặc SVG, Custom elements
    return <HeadingTag {...rest}>{text}</HeadingTag>;
  } else {
    return null;
  }
}
