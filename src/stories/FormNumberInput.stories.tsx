import { Meta, Story } from "@storybook/react";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FormNumberInput, {
  NumberInputType,
} from "../components/form/FormNumberInput";

const meta: Meta<typeof FormNumberInput> = {
  title: "Form/NumberInput",
  component: FormNumberInput,
  argTypes: {
    name: { control: { disable: true } },
    control: { control: { disable: true } },
    label: { control: "text" },
  },
  tags: ["autodocs"],
};
export default meta;

const FormTemplate: Story<{
  label: string;
  name: string;
  rules?: RegisterOptions;
}> = (args: NumberInputType) => {
  const { handleSubmit, control } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormNumberInput {...args} control={control} />
      <button type="submit">Submit</button>
    </form>
  );
};

export const Default = FormTemplate.bind({});
Default.args = {
  name: "playerCount",
  label: "Vui lòng nhập số lượng người chơi:",
};

export const WithError = FormTemplate.bind({});
WithError.args = {
  name: "playerCount",
  label: "Vui lòng nhập số lượng người chơi:",
  rules: { required: "Thiếu thông tin" },
};
