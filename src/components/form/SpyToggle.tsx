import { motion } from "framer-motion";
import classNames from "classnames";

type SpyToggleType = {
  containerWidth: number;
  knobSize: number;
  toggled: boolean;
  onChange: () => void;
  disabled?: boolean;
};

export default function SpyToggle({
  containerWidth,
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
        "bg-slate-200 rounded-full relative cursor-pointer",
        {
          "cursor-not-allowed opacity-50": disabled,
        }
      )}
      style={{
        width: `${containerWidth}px`,
        height: `${knobSize}px`,
      }}
    >
      <input
        type="checkbox"
        checked={toggled}
        onChange={handleChange}
        className="opacity-0 w-full h-full absolute"
        disabled={disabled}
      />
      <motion.div
        className={classNames("bg-black rounded-full")}
        style={{
          width: `${knobSize}px`,
          height: `${knobSize}px`,
        }}
        animate={{
          translateX: toggled ? 0 : containerWidth - knobSize,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={handleChange}
      />
    </div>
  );
}
