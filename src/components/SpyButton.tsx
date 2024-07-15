import classNames from "classnames";
import { SpyButtonProp, SpyButtonSize } from "./SpyButtonType";
import { Color } from "../theme";
import { motion } from "framer-motion";
export default function SpyButton({
  label,
  onClick,
  color,
  size,
  customClass,
  type,
}: SpyButtonProp) {
  const getButtonColor = (color: Color): string[] => {
    switch (color) {
      case Color.Primary:
        return ["bg-primary", "text-dark"];
      case Color.Secondary:
        return ["bg-secondary", "text-white"];
      case Color.Dark:
        return ["bg-dark", "text-white"];
      case Color.None:
        return [""];
    }
  };

  const getButtonSize = (size: SpyButtonSize): string[] => {
    switch (size) {
      case SpyButtonSize.SM:
        return ["p-1"];
      case SpyButtonSize.MD:
        return ["p-2"];
      case SpyButtonSize.LG:
        return ["p-3"];
      case SpyButtonSize.XL:
        return ["p-4"];
    }
  };

  return (
    <motion.button
      className={classNames(
        "rounded-xl",
        customClass,
        getButtonColor(color),
        getButtonSize(size)
      )}
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.1 }}
    >
      {label}
    </motion.button>
  );
}
