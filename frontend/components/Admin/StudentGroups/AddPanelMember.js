import { Button } from "@mui/material";
import axios from "axios";
import TextFieldComponent from "../../Common/TextFieldComponent";

const AddPanelMember = ({
  fPanelMemberName,
  setFPMName,
  sPanelMemberName,
  setSPMName,
  tPanelMemberName,
  setTPMName,
  groupObjId
}) => {
  const handelOnSubmit = (event) => {
    event.preventDefault();
    const panelMembers ={
      memberOne : fPanelMemberName, memberTwo: sPanelMemberName, memberThree: tPanelMemberName
    }
    await axios
      .put(`${BASE_URL}/groups/addPanelMembers/${groupObjId}`,panelMembers)
      .then((response) => {
        console.log(response.data);
        alert("Panel members added successfully")
      })
      .catch((err) => {
        console.log(err); 
        alert("Panel members not added ")
      });
  };
  return (
    <>
      <form onSubmit={handelOnSubmit}>
        <TextFieldComponent
          label="1st panel member name"
          inputName="fpmName"
          classes="form-field"
          width="100%"
          inputValue={fPanelMemberName}
          required
          handleChange={(e) => setFPMName(e.target.value)}
        />
        <TextFieldComponent
          label="2nd panel member name"
          inputName="spmName"
          classes="form-field"
          width="100%"
          inputValue={sPanelMemberName}
          required
          handleChange={(e) => setSPMName(e.target.value)}
        />
        <TextFieldComponent
          label="3rd panel member name"
          inputName="tpmName"
          classes="form-field"
          width="100%"
          inputValue={tPanelMemberName}
          required
          handleChange={(e) => setTPMName(e.target.value)}
        />
        {/* <TextFieldComponent
          label="2nd member registration number"
          width="100%"
          required
        /> */}

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

export default AddPanelMember;
