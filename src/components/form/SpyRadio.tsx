import { useFormContext } from "react-hook-form";

type SpyRadioProp = {
  name: string;
  label: string;
  submitValue: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SpyRadio({
  name,
  label,
  submitValue,
  onChange,
}: SpyRadioProp) {
  const { register } = useFormContext();
  return (
    <label className="flex flex-row-reverse gap-1 ">
      {label}
      <input
        type="radio"
        {...register(name)}
        value={submitValue}
        className="align-middle"
        onChange={onChange}
      ></input>
    </label>
  );
}
