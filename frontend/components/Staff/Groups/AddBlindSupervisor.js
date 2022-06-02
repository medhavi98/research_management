import { Button, FormControl, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import DropDown from "../../Common/DropDown";
import TextFieldComponent from "../../Common/TextFieldComponent";

const AddBlindSupervisor = () => {
  const handelOnSubmit = async (event) => {
    event.preventDefault();
    const panelMembers = {
      memberOne: fPanelMemberName,
      memberTwo: sPanelMemberName,
      memberThree: tPanelMemberName,
    };
    await axios
      .put(`${BASE_URL}/groups/addPanelMembers/${groupObjId}`, panelMembers)
      .then((response) => {
        console.log(response.data);
        alert("Panel members added successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Panel members not added ");
      });
  };

  const userTypes = [
    { name: "Karthiga", value: "Karthiga" },
    { name: "Lalith", value: "Lalith" },
  ];

  const [fPanelMemberName, setfPanelMemberName] = useState("");
  const [sPanelMemberName, setsPanelMemberName] = useState("");
  const [tPanelMemberName, settPanelMemberName] = useState("");

  const userTypeHandler = (event) => {
    setfPanelMemberName(event.target.value);
  };
  const userTypeHandler2 = (event) => {
    setsPanelMemberName(event.target.value);
  };
  const userTypeHandler3 = (event) => {
    settPanelMemberName(event.target.value);
  };

  return (
    <Grid mt={2}>
      <form onSubmit={handelOnSubmit}>
        <Grid mt={2}>
          <DropDown
            label="Add blind Supervisor"
            tValue="Add blind Supervisor"
            name="user_type"
            value={fPanelMemberName}
            minWidth="100%"
            onChange={userTypeHandler}
            options={userTypes}
          />
        </Grid>

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
    </Grid>
  );
};

export default AddBlindSupervisor;
