import { motion } from "framer-motion";
import classNames from "classnames";
import { ElementTestIds } from "../../SpyUlt";

type SpyToggleType = {
  containerWidth: number;
  containerHeight: number;
  knobSize: number;
  toggled: boolean;
  onChange: () => void;
  disabled?: boolean;
};

export default function SpyToggle({
  containerWidth,
  containerHeight,
  knobSize,
  toggled,
  onChange,
  disabled = false,
}: SpyToggleType) {
  const handleChange = () => {
    if (!disabled) {
      onChange();
    }
  };
  return (
    <div
      className={classNames(
        "switch bg-slate-200 w-12 h-6 rounded-full flex items-center px-1 cursor-pointer",
        {
          "justify-start": toggled,
          "justify-end": !toggled,
          "opacity-50 cursor-not-allowed": disabled,
        }
      )}
      style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}
      onClick={handleChange}
      data-testid={ElementTestIds.toggle}
    >
      <motion.div
        layout
        className="knob bg-black rounded-full"
        style={{ width: `${knobSize}px`, height: `${knobSize}px` }}
        onClick={handleChange}
      ></motion.div>
    </div>
  );
}
