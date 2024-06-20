import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormNumberInput from "./FormNumberInput";
import FormTextInput from "./FormTextInput";

export default function FormContainer() {
  const { handleSubmit, control } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormNumberInput
        control={control}
        name="playerCount"
        label="Vui lòng nhập số lượng người chơi:"
        rules={{ valueAsNumber: true }}
      />
      <FormTextInput
        control={control}
        name="playerName"
        label="Tên người chơi"
      />
    </form>
  );
}
