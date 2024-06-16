import classNames from "classnames";
import { SpyButtonProp, SpyButtonSize } from "./SpyButtonType";
import { Color } from "../theme";

export default function SpyButton({
  label,
  onClick,
  color,
  size,
}: SpyButtonProp) {
  const getButtonColor = (color: Color): string[] => {
    switch (color) {
      case Color.Primary:
        return ["bg-primary", "text-dark"];
      case Color.Secondary:
        return ["bg-secondary", "text-white"];
      case Color.Dark:
        return ["bg-dark", "text-white"];
    }
  };

  const getButtonSize = (size: SpyButtonSize): string[] => {
    switch (size) {
      case SpyButtonSize.SM:
        return ["p-2"];
      case SpyButtonSize.MD:
        return ["p-3"];
      case SpyButtonSize.LG:
        return ["p-4"];
      case SpyButtonSize.XL:
        return ["p-5"];
    }
  };

  return (
    <button
      className={classNames(
        "rounded-xl",
        getButtonColor(color),
        getButtonSize(size)
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
