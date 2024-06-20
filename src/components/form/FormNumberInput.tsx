import { AnimatePresence } from "framer-motion";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { motion } from "framer-motion";
export type NumberInputType = {
  control: Control;
  name: string;
  label: string;
  rules?: RegisterOptions;
};

export default function FormNumberInput({
  control,
  name,
  label,
  rules,
}: NumberInputType) {
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
      <input {...field} type="number" />
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
