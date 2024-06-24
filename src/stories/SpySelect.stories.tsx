import { Meta, StoryObj } from "@storybook/react";
import SpySelect from "../components/form/SpySelect";
import { FormProvider, useForm } from "react-hook-form";
const meta: Meta<typeof SpySelect> = {
  title: "Form/Select",
  component: SpySelect,

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
export const Select: Story = {
  args: {
    label: "Select:",
    name: "select",
    list: { 1: "a", 2: "b", 3: "c" },
  },
};
