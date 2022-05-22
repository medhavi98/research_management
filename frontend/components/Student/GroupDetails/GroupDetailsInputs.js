import { Button } from "@mui/material";
import TextFieldComponent from "../../Common/TextFieldComponent";

const GroupDetailsInputs = () => {
  const handelOnSubmit = (event) => {
    event.preventDefault();
    console.log("Testing");
  };
  return (
    <>
      <form onSubmit={handelOnSubmit}>
        <TextFieldComponent
          label="Leader's registration number"
          width="100%"
          required
        />
        <TextFieldComponent
          label="2nd member registration number"
          width="100%"
          required
        />
        <TextFieldComponent
          label="3rd member registration number"
          width="100%"
          required
        />
        <TextFieldComponent
          label="4th member registration number"
          width="100%"
          required
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

export default GroupDetailsInputs;
