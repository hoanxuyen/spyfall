import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { RegisterOptions, useFormContext } from "react-hook-form";
import SpyButton from "../SpyButton";
import { Color } from "../../theme";
import { SpyButtonSize } from "../SpyButtonType";
import { FormLabelClass } from "../../SpyUlt";

export type InputType = {
  name: string;
  label?: string;
  rules?: RegisterOptions;
  type?: "text" | "number";
  placeholder?: string;
  buttonLabel?: string;
  onClick?: () => void;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SpyInput({
  name,
  label,
  rules,
  type,
  placeholder,
  buttonLabel,
  onClick,
  value,
  onChange,
}: InputType) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const getInputTypes = (type?: string): "text" | "number" => {
    const validTypes = ["text", "number"];
    return type && validTypes.includes(type)
      ? (type as "text" | "number")
      : "text";
  };

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

  return (
    <>
      {buttonLabel && onClick ? (
        // Input with button
        <div className="flex bg-black px-2">
          <motion.input
            data-testid="formInputWithBtn"
            {...register(name, rules)}
            type={getInputTypes(type)}
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && onClick) {
                e.preventDefault();
                onClick();
              }
            }}
            className={classNames("w-full", "outline-none", "bg-black", {
              "transition-all outline-red-300": errors[name],
            })}
            initial={{ x: 0 }}
            animate={errors[name] ? "shake" : ""}
            variants={shakeVariants}
            placeholder={placeholder}
          />
          <SpyButton
            color={Color.None}
            label={buttonLabel}
            onClick={onClick}
            type="button"
            size={SpyButtonSize.SM}
            customClass="text-5xl"
          />
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
      ) : (
        //Input
        <div>
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
            data-testid="formInputElement"
            {...register(name, rules)}
            type={getInputTypes(type)}
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && onClick) {
                e.preventDefault();
                onClick();
              }
            }}
            className={classNames("w-full", "outline-none", "bg-transparent", {
              "transition-all outline-red-300": errors[name],
            })}
            initial={{ x: 0 }}
            animate={errors[name] ? "shake" : ""}
            variants={shakeVariants}
            placeholder={placeholder}
          />
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
      )}
    </>
  );
}
