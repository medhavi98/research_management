import React, { useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddPanelMember from "../../Admin/StudentGroups/AddPanelMember";
import FormDialog from "../../Common/FormDialog";
import AddBlindSupervisor from "./AddBlindSupervisor";
// import FormDialog from "../../Common/FormDialog";
// import AddPanelMember from "./AddPanelMember";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import doc1 from "./docImage.jpg";
import AddMarks from "./AddMarks";

const commonStyles = {
  borderLeft: 5,
  boxShadow: "0 6px 20px rgba(56, 125, 255, 0.17)",
};

const BlindGroups = ({
  GroupId,
  supervisorName,
  coSupervisorName,
  pMembers,
  students,
  groupObjId,
}) => {
  const [marks, setMarks] = React.useState("");

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
            <h3>GroupID:{GroupId}</h3>
          </b>
        </Grid>
        <Grid item md={3}>
          <FormDialog
            testButton="Add Marks"
            Description="Add Marks"
            onButtonPress={() => {
              console.log("group details");
            }}
            children={<AddMarks marks={marks} setMarks={setMarks} />}
          />
        </Grid>
        <Grid mt={2}>
          <Grid container>
            <Grid item md={8}>
              <Typography mt={4}>Research topic</Typography>
              <Typography mt={4}>Charter Document</Typography>
              <Typography mt={4}>Presentation </Typography>
            </Grid>
            <Grid item mt={4} md={4}>
              <Grid>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  type="submit"
                  component="label"
                  startIcon={<FileDownloadIcon />}
                >
                  <a
                    href={doc1}
                    download
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Download
                  </a>
                </Button>
              </Grid>
              <Grid mt={3}>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  component="label"
                  startIcon={<FileDownloadIcon />}
                >
                  <a
                    href=""
                    download
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Download
                  </a>
                </Button>
              </Grid>
              <Grid mt={3}>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  component="label"
                  startIcon={<FileDownloadIcon />}
                >
                  <a
                    href=""
                    download
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Download
                  </a>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlindGroups;
