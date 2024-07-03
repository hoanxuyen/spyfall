import classNames from "classnames";
import { useNavigate } from "react-router-dom";

export default function SpyTitle({
  label = "Điệp viên hai mang",
  animation = "animate-bounce",
}: {
  label?: string;
  animation?: string;
}) {
  const navigate = useNavigate();
  return (
    <h1
      className={classNames(
        "title",
        "font-honk",
        "text-center",
        animation
      )}
      onClick={() => {
        navigate("/");
      }}
    >
      {label}
    </h1>
  );
}
