import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
type FormContainerProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
};
export default function FormContainer({
  onSubmit,
  children,
}: FormContainerProps) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
