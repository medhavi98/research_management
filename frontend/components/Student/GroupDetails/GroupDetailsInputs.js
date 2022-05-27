import { Button } from "@mui/material";
import TextFieldComponent from "../../Common/TextFieldComponent";
import { useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { getUserSessionDetails} from "../../../helpers/userSessionHandler";

const GroupDetailsInputs = () => {
  const [leader, setLeader] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [member4, setMember4] = useState("");
  const members = [leader, member2, member3, member4];
  const { userId } = getUserSessionDetails();

  const handelOnSubmit = (event) => {
    event.preventDefault();
    const groupDetails = {
      groupLeaderId: leader,
      studentIds: members,
    };
    console.log("groupDetails", groupDetails);
    console.log("Testing event: ", event);

    axios
      .post(`${BASE_URL}/groups`, { groupDetails })
      .then(() => {
        window.alert("Group Registered!");
      })
      .catch((err) => {
        window.alert("Group Not Registered!", err.message);
      });
  };

  return (
    <>
      <form onSubmit={handelOnSubmit}>
        <TextFieldComponent
          label="Leader's registration number"
          width="100%"
          required
          handleChange={(e) => {
            console.log("form e value ", e.target.value);
            setLeader(e.target.value);
          }}
        />
        <TextFieldComponent
          label="2nd member registration number"
          width="100%"
          required
          handleChange={(e) => {
            setMember2(e.target.value);
          }}
        />
        <TextFieldComponent
          label="3rd member registration number"
          width="100%"
          required
          handleChange={(e) => {
            setMember3(e.target.value);
          }}
        />
        <TextFieldComponent
          label="4th member registration number"
          width="100%"
          required
          handleChange={(e) => {
            setMember4(e.target.value);
          }}
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
