import Rules from "./Rules";
import SpyTitle from "./SpyTitle";
import FormContainer from "./form/FormContainer";

export default function MainMenu() {
  return (
    <div className="p-4">
      <SpyTitle />
      <FormContainer />
      <Rules />
    </div>
  );
}
