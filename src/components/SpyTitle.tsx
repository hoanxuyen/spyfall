import classNames from "classnames";

export default function SpyTitle({
  label = "Điệp viên hai mang",
  animation = "animate-bounce",
}: {
  label?: string;
  animation?: string;
}) {
  return (
    <h1 className={classNames("title", "font-honk", "text-center", animation)}>
      {label}
    </h1>
  );
}
