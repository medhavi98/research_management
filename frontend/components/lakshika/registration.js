import Button from "../Common/Button";
import TextFieldComponent from "../Common/TextFieldComponent";

const Registration = () => {
  return (
    <div>
      <h1>Hello</h1>
      <TextFieldComponent
        label="Email Address"
        inputName="email"
        classes="form-field"
        required
      />
    </div>
  );
};

export default Registration;
