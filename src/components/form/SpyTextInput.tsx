import { AnimatePresence } from "framer-motion";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";

export type TextInputType = {
  name: string;
  label: string;
  rules?: RegisterOptions;
  type?: "text" | "number";
};

export default function SpyTextInput({
  name,
  label,
  rules,
  type,
}: TextInputType) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  /** Có thể dùng useFormContext để trực tiếp access vào tất cả method của form mà nó nằm ở trong
   *  khác với useController thì formcontext hạn chế prop drilling khi phải pass xuống các method của form quá nhiều lần,
   *  useController có provides fieldState(invalid , error) object để giúp handling error trực tiếp trong component
   */
  const getInputTypes = (type?: string): "text" | "number" => {
    const validTypes = ["text", "number"];
    return type && validTypes.includes(type)
      ? (type as "text" | "number")
      : "text";
  };
  return (
    <div>
      <label data-testid="formInputLabel" htmlFor={name}>
        {label}
      </label>
      <input
        data-testid="formInputElement"
        {...register(name, rules)}
        type={getInputTypes(type)}
      />
      {/**Animate */}
      <AnimatePresence>
        {errors[name] && (
          <motion.span
            data-testid="formInputError"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ color: "red" }}
            className="block font-bold"
          >
            {errors[name]?.message?.toString()} {/**Nullish Coalescing */}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
