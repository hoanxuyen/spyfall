import { HTMLAttributes, ReactElement } from "react";

type SpyParagraphProps = HTMLAttributes<HTMLElement> & {
  text: string | ReactElement;
};
export default function SpyParagraph({ text, ...rest }: SpyParagraphProps) {
  return <p {...rest}>{text}</p>;
}
