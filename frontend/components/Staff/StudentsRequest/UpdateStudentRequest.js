import { Button, Grid } from "@mui/material";
import { useState } from "react";
import DropDown from "../../Common/DropDown";
import TextFieldComponent from "../../Common/TextFieldComponent";
import axios from "axios";
import { BASE_URL } from "../../constants";

const UpdateStudentRequest = ({ id, handelOnSubmit }) => {
  const [review, setReview] = useState("");
  const [status, setStatus] = useState("");

  const userTypes = [
    { name: "Accept", value: "Accept" },
    { name: "Reject", value: "Reject" },
  ];

  return (
    <>
      <form onSubmit={(e) => handelOnSubmit(e, review, status)}>
        <TextFieldComponent
          label="Add Review"
          width="100%"
          required
          handleChange={(e) => setReview(e.target.value)}
        />
        <DropDown
          label="Reject Or Accept"
          tValue="Reject Or Accept"
          name="user_type"
          value={status}
          minWidth="100%"
          onChange={(e) => setStatus(e.target.value)}
          options={userTypes}
        />

        <Grid mt={2}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ float: "right" }}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default UpdateStudentRequest;
