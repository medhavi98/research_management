import { Button } from "@mui/material";
import TextFieldComponent from "../../Common/TextFieldComponent";

const UpdateUserDetails = ({
  RNumber,
  setRNumber,
  fullName,
  setFullName,
  sliitMail,
  setSliitMail,
  personalEmail,
  setPersonalEmail,
  phoneNumber,
  setPhoneNumber,
}) => {
  const handelOnSubmit = (event) => {
    event.preventDefault();
    console.log("Testing");
  };

  return (
    <>
      <form onSubmit={handelOnSubmit}>
        <TextFieldComponent
          label="Registration Number"
          inputName="RNumber"
          classes="form-field"
          width="100%"
          inputValue={RNumber}
          required
          disabled
        />
        <TextFieldComponent
          label="Name"
          inputName="name"
          classes="form-field"
          width="100%"
          inputValue={fullName}
          required
          disabled
        />
        <TextFieldComponent
          label="SLLIT Email"
          inputName="sliitMail"
          classes="form-field"
          width="100%"
          inputValue={sliitMail}
          required
          disabled
        />
        <TextFieldComponent
          label="Personal Email"
          inputName="pMail"
          classes="form-field"
          width="100%"
          inputValue={personalEmail}
          required
          handleChange={(e) => setPersonalEmail(e.target.value)}
        />
        <TextFieldComponent
          label="Phone Number"
          inputName="pNumber"
          classes="form-field"
          width="100%"
          inputValue={phoneNumber}
          required
          handleChange={(e) => setPhoneNumber(e.target.value)}
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

export default UpdateUserDetails;
