import { Button, FormControl, Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import DropDown from "../../Common/DropDown";
import TextFieldComponent from "../../Common/TextFieldComponent";
import { BASE_URL } from "../../constants";
import { getUserSessionDetails } from '../../../helpers/userSessionHandler';

const AddBlindSupervisor = ({ id, fetchGroupUserNames }) => {

  const [reviewer, setReviewer] = useState("");
  const [sPanelMemberName, setsPanelMemberName] = useState("");
  const [tPanelMemberName, settPanelMemberName] = useState("");
  const [blindReviewers, setBlindReviewers] = useState([]);
  const { userId } = getUserSessionDetails();

  useEffect(() => {
    fetchBlindSupervisors();
  }, [])

  const fetchBlindSupervisors = async () => {
    const res = await axios.get(`${BASE_URL}/user/getSupervisors`);
    let arr = [];
    res.data.users.map((user, index) => {
      if (user._id !== userId) {
        arr = ([...arr, {
          name: user.fullName,
          value: user._id,
        }])
      }
    })
    setBlindReviewers(arr);
  };

  const userTypeHandler = (event) => {
    setReviewer(event.target.value);
  };

  const handelOnSubmit = async (event) => {
    event.preventDefault();
    console.log(id)
    const res = await axios.post(`${BASE_URL}/groups/addBlindReviewer/${id}`, {
      blindReviewerId: reviewer,
    });
    if (res.data.group) {
      alert("✔ Blind reviewer added successfully!");
      fetchGroupUserNames();
    }

  };

  return (
    <Grid mt={2}>
      <form onSubmit={handelOnSubmit}>
        <Grid mt={2}>
          <DropDown
            label="Add blind Supervisor"
            tValue="Add blind Supervisor"
            name="user_type"
            value={reviewer}
            minWidth="100%"
            onChange={userTypeHandler}
            options={blindReviewers}
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
