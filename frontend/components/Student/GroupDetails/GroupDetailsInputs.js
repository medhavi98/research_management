import { Button } from "@mui/material";
import TextFieldComponent from "../../Common/TextFieldComponent";
import { useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";

const GroupDetailsInputs = () => {
  const handelOnSubmit = (event) => {
    event.preventDefault();
    console.log("Testing");
  };

  const [members, setMembers] = useState([]);
  const [leader, setLeader] = useState("");
  // const [member1, setMember1] = useState("");
  // const [member2, setMember2] = useState("");
  // const [member3, setMember3] = useState("");

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
