import { Color } from "../theme";

export enum SpyButtonSize {
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
}

export type SpyButtonProp = {
  label: string;
  onClick?: () => void;
  color: Color;
  size: SpyButtonSize;
  type?: "button" | "submit" | "reset";
};
