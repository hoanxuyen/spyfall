import { AnimatePresence } from "framer-motion";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import classNames from "classnames";

export type InputType = {
  name: string;
  label: string;
  rules?: RegisterOptions;
  type?: "text" | "number";
};
export default function SpyInput({ name, label, rules, type }: InputType) {
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
      x: [0, 100, -100, 100, 0], // Move left, right, and back to center
      transition: {
        duration: 0.3,
        times: [0, 0.2, 0.4, 0.6, 0.8], // Control timing for smoother shaking
        ease: "easeOut",
      },
    },
  };
  return (
    <div>
      <label data-testid="formInputLabel" htmlFor={name}>
        {label}
      </label>
      <motion.input
        data-testid="formInputElement"
        {...register(name, rules)}
        type={getInputTypes(type)}
        className={classNames(
          "block",
          "outline-none",
          "bg-transparent",
          "transition-all",
          { "outline-red-300": errors[name] }
        )}
        initial={{ x: 0 }}
        animate={errors[name] ? "shake" : ""}
        variants={shakeVariants}
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
            key={name + "-error"} // Ensure a unique key to trigger animation
          >
            {errors[name]?.message?.toString()}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
