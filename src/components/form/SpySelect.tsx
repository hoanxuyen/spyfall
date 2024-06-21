import { useFormContext } from "react-hook-form";

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
      <label data-testid="formSelectLabel" htmlFor={name}>
        {label}
      </label>
      <select {...register(name)} data-testid="formSelect">
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
