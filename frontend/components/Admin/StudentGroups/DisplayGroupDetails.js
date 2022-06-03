import React, { useState } from "react";
import { Button, Card, Grid } from "@mui/material";
import { Box } from "@mui/system";
import FormDialog from "../../Common/FormDialog";
import AddPanelMember from "./AddPanelMember";

const commonStyles = {
  borderLeft: 5,
  boxShadow: "0 6px 20px rgba(56, 125, 255, 0.17)",
};

const DisplayGroupDetails = ({
  GroupId,
  supervisorName,
  coSupervisorName,
  pMembers,
  students,
  groupObjId,
  panelMembers,
}) => {
  console.log("panelMembers in display: ", panelMembers);
  const [fPanelMemberName, setFPMName] = React.useState("");
  const [sPanelMemberName, setSPMName] = React.useState("");
  const [tPanelMemberName, setTPMName] = React.useState("");
  return (
    <Box
      sx={{
        ...commonStyles,
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: 2,
        padding: "30px 40px",
        borderRadius: "10px",
        backgroundColor: "#DDDDDD",
        borderLeftColor: "#9cbcff",
      }}
    >
      <Grid container m={3}>
        <Grid item md={9}>
          <b>
            <h3>{GroupId}</h3>
          </b>
        </Grid>
        <Grid item md={3}>
          <FormDialog
            testButton="Add panel members"
            Description="Add panel members details"
            onButtonPress={() => {
              console.log("group details");
            }}
            children={
              <AddPanelMember
                panelMembers={panelMembers}
                groupObjId={groupObjId}
              />
            }
          />
        </Grid>

        <Grid container mt={5}>
          <Grid item md={3}>
            <b>Supervisor Name</b>
          </Grid>
          <Grid item md={6}>
            {supervisorName ? supervisorName : "Not assigned."}
          </Grid>
        </Grid>

        <Grid container mt={2}>
          <Grid item md={3}>
            <b>Co-Supervisor Name</b>
          </Grid>
          <Grid item md={6}>
            {coSupervisorName ? coSupervisorName : "Not assigned."}
          </Grid>
        </Grid>

        <Grid container mt={2}>
          <Grid item md={3}>
            <b>Panel members</b>
          </Grid>
          {pMembers
            ? pMembers.map((member) => {
                return (
                  <Grid item md={3}>
                    {member.fullName}
                  </Grid>
                );
              })
            : "Not assigned."}
        </Grid>

        <Grid container mt={2}>
          <Grid item md={12}>
            <b>Students</b>
          </Grid>
        </Grid>
        <Grid container mt={2}>
          {students
            ? students.map((student) => {
                return (
                  <Grid item md={3}>
                    {student.fullName}
                  </Grid>
                );
              })
            : "Not added."}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DisplayGroupDetails;
