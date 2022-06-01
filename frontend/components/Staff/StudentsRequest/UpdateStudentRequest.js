import { useState } from "react";
import DropDown from "../../Common/DropDown";
import TextFieldComponent from "../../Common/TextFieldComponent";

const UpdateStudentRequest = () => {
  const handelOnSubmit = () => {};

  const [review, setReview] = useState("");
  const [fPanelMemberName, setfPanelMemberName] = useState("");
  const userTypeHandler = (event) => {
    setfPanelMemberName(event.target.value);
  };
  const userTypes = [
    { name: "Karthiga", value: "Karthiga" },
    { name: "Lalith", value: "Lalith" },
  ];
  return (
    <>
      <form onSubmit={handelOnSubmit}>
        <TextFieldComponent
          label="Add Review"
          width="100%"
          required
          handleChange={(e) => {
            console.log("form e value ", e.target.value);
            setReview(e.target.value);
          }}
        />
        <DropDown
          label="Reject Or Accept"
          tValue="Reject Or Accept"
          name="user_type"
          value={fPanelMemberName}
          minWidth="100%"
          onChange={userTypeHandler}
          options={userTypes}
        />
      </form>
    </>
  );
};

export default UpdateStudentRequest;
