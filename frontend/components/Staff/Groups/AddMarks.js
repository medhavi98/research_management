import { Button } from "@mui/material";
import TextFieldComponent from "../../Common/TextFieldComponent";

const AddMarks = ({ marks, setMarks }) => {
  const handelOnSubmit = (event) => {
    event.preventDefault();
    console.log("Testing");
  };

  return (
    <>
      <form onSubmit={handelOnSubmit}>
        <TextFieldComponent
          label="Add marks"
          inputName="marks"
          classes="form-field"
          width="100%"
          inputValue={marks}
          required
          disabled
          handleChange={(e) => setMarks(e.target.value)}
        />

        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{ float: "right" }}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default AddMarks;
