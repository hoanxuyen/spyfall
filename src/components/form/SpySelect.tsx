import { useFormContext } from "react-hook-form";
import { FormLabelClass } from "../../SpyUlt";

export type SpySelect = {
  label: string;
  name: string;
  list: { [key: string | number]: string };
};
export default function SpySelect({ label, name, list }: SpySelect) {
  const options = Object.entries(list).map(([key, value]) => ({ key, value }));
  const { register } = useFormContext();
  return (
    <div>
      <label
        data-testid="formSelectLabel"
        htmlFor={name}
        className={FormLabelClass}
      >
        {label}
      </label>
      <select
        {...register(name)}
        data-testid="formSelect"
        className="block dark:bg-black bg-inherit p-2"
      >
        {options.map((option, optionIndex) => (
          <option
            key={optionIndex}
            value={option.key}
            data-testid={`FormSelectOption-${optionIndex}`}
          >
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}
