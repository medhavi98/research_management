import React, { useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

const commonStyles = {
  borderLeft: 5,
  boxShadow: "0 6px 20px rgba(56, 125, 255, 0.17)",
};

const DownloadDocument = ({
  GroupId,
  supervisorName,
  coSupervisorName,
  pMembers,
  students,
  groupObjId,
}) => {
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
        <Grid item md={3}></Grid>
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
                  startIcon={<DriveFolderUploadIcon />}
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
                  startIcon={<DriveFolderUploadIcon />}
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
                  startIcon={<DriveFolderUploadIcon />}
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

export default DownloadDocument;
