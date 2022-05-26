import React, { useState } from "react";
import { Button, Card, Grid } from "@mui/material";

const DisplayGroupDetails = ({
  GroupId,
  supervisorName,
  coSupervisorName,
  pMembers,
  students,
}) => {
  return (
    <Card sx={{ mt: 2 }}>
      <Grid container m={3}>
        <Grid item md={9}>
          <b>
            <h3>{GroupId}</h3>
          </b>
        </Grid>
        <Grid item md={3}>
          <Button variant="contained" color="success" size="small">
            Add Panel Member
          </Button>
        </Grid>

        <Grid container mt={5}>
          <Grid item md={3}>
            Supervisor Name
          </Grid>
          <Grid item md={6}>
            {supervisorName ? supervisorName : 'Not assigned.'}
          </Grid>
        </Grid>

        <Grid container mt={2}>
          <Grid item md={3}>
            Co-Supervisor Name
          </Grid>
          <Grid item md={6}>
            {coSupervisorName ? coSupervisorName : 'Not assigned.'}
          </Grid>
        </Grid>

        <Grid container mt={2}>
          <Grid item md={3}>
            Panel members
          </Grid>
          {pMembers.length > 0 ? (pMembers.map((member) => {
            return (
              <Grid item md={3}>
                {member}
              </Grid>
            );
          })) : 'Not assigned.'}
        </Grid>

        <Grid container mt={2}>
          <Grid item md={12}>
            Students
          </Grid>
        </Grid>
        <Grid container mt={2}>
          {students.length > 0 ? (students.map((student) => {
            return (
              <Grid item md={3}>
                {student}
              </Grid>
            );
          })) : 'Not added.'}
        </Grid>
      </Grid>
    </Card>
  );
};

export default DisplayGroupDetails;
