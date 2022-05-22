import React from "react";
import FormDialog from "../Common/FormDialog";
import GroupDetailsInputs from "./GroupDetails/GroupDetailsInputs";


const GroupDetails = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormDialog
        testButton="Add Group Member"
        Description="Add Your Research Group Member Details"
        onButtonPress={() => {
          console.log("group details");
        }}
        children={<GroupDetailsInputs />}
      />
    </div>
  );
};

export default GroupDetails;
