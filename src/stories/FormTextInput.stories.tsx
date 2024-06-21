import { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import FormTextInput from "../components/form/FormTextInput";

const meta: Meta<typeof FormTextInput> = {
  title: "Form/NumberInput",
  component: FormTextInput,
  argTypes: {
    name: { control: { disable: true } },
    label: { control: "text" },
  },
  decorators: [
    (Story) => {
      const methods = useForm();
      const onSubmit = () => console.log("submitted");
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "example",
    label: "Example",
  },
};
export const WithValidation: Story = {
  args: {
    name: "validated",
    label: "Validated",
    rules: { required: "Required" },
  },
  render: ({ ...args }) => (
    <>
      <FormTextInput {...args} />
      <button type="submit">Submits</button>
    </>
  ),
};
