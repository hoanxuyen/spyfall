import classNames from "classnames";
import { useFormContext } from "react-hook-form";

type SpyInputWithBtnProps = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  placeholder?: string;
  inputClassName?: string;
  buttonClassName?: string;
  buttonLabel?: string;
};

export default function SpyInputWithBtn({
  name,
  value,
  onChange,
  onClick,
  placeholder,
  inputClassName,
  buttonClassName,
  buttonLabel,
}: SpyInputWithBtnProps) {
  const { register } = useFormContext();

  return (
    <div className="flex bg-black px-2">
      <input
        {...register(name)}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onClick();
          }
        }}
        className={classNames(
          "w-full",
          "outline-none",
          "bg-black",
          inputClassName
        )}
        data-testid="formInputWithBtn"
      />
      <button
        type="button"
        className={classNames("text-5xl", buttonClassName)}
        onClick={onClick}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
