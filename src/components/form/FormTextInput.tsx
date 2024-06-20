import { AnimatePresence } from "framer-motion";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { motion } from "framer-motion";
export type TextInputType = {
  control: Control;
  name: string;
  label: string;
  rules?: RegisterOptions;
};

export default function FormTextInput({
  control,
  name,
  label,
  rules,
}: TextInputType) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      <label>{label}</label>
      <input {...field} type="text" />
      <AnimatePresence>
        {invalid && (
          <motion.span
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ color: "red" }}
            className="block font-bold"
          >
            {error?.message}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
