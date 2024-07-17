import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { RegisterOptions, useFormContext } from "react-hook-form";
import SpyButton from "../SpyButton";
import { Color } from "../../theme";
import { SpyButtonSize } from "../SpyButtonType";
import { FormLabelClass } from "../../SpyUlt";

interface InputProps {
  name: string;
  label?: string;
  rules?: RegisterOptions;
  type?: "text" | "number";
  placeholder?: string;
  buttonLabel?: string;
  onClick?: () => void;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const shakeVariants = {
  shake: {
    x: [0, 100, -100, 100, 0],
    transition: {
      duration: 0.3,
      times: [0, 0.2, 0.4, 0.6, 0.8],
      ease: "easeOut",
    },
  },
};

export default function SpyInput({
  name,
  label,
  rules,
  type = "text", // Default to "text" if not provided
  placeholder,
  buttonLabel,
  onClick,
  value,
  onChange,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={classNames({ "flex bg-black px-2": buttonLabel && onClick })}
    >
      {label && (
        <label
          data-testid="formInputLabel"
          htmlFor={name}
          className={FormLabelClass}
        >
          {label}
        </label>
      )}

      <motion.input
        data-testid={buttonLabel ? "formInputWithBtn" : "formInputElement"}
        {...register(name, rules)}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={classNames(
          "w-full outline-none pl-2",
          { "bg-black text-white": buttonLabel && onClick },
          { "bg-transparent": !(buttonLabel && onClick) },
          { "transition-all outline-red-300": errors[name] }
        )}
        initial={{ x: 0 }}
        animate={errors[name] ? "shake" : ""}
        variants={shakeVariants}
        placeholder={placeholder}
      />

      {buttonLabel && onClick && (
        <SpyButton
          color={Color.None}
          label={buttonLabel}
          onClick={onClick}
          type="button"
          size={SpyButtonSize.SM}
          customClass="text-5xl text-white"
        />
      )}

      <AnimatePresence>
        {errors[name] && (
          <motion.span
            data-testid="formInputError"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ color: "red" }}
            className="block font-bold mt-2"
            key={name + "-error"}
          >
            {errors[name]?.message?.toString()}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
