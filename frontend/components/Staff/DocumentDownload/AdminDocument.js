import React, { useEffect, useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import axios from "axios";

function AdminDocument() {
  const [submittedDocuments, setSubmittedDocuments] = useState([]);

  useEffect(() => {
    console.log("hhgf");
    getStaffResources();
  }, []);

  const getStaffResources = async () => {
    await axios
      .get("http://localhost:5001/adminDocumentUploadRouter/staffResource")
      .then((response) => {
        console.log("response for get staff", response);
        setSubmittedDocuments(response.data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };
  return (
    <>
      {submittedDocuments ? (
        submittedDocuments.map((doc, index) => {
          console.log("doc admin" + doc.submissionTitle);
          return (
            <>
              <Card variant="outlined" className="uploaded-card" key={doc._id}>
                <Typography variant="h6" mt={1} mb={1} ml={2} mr={1}>
                  {doc.submissionTitle}
                </Typography>
                <div className="uploaded-card-Btn">
                  <a href={doc.templateFile}>
                    <Button>
                      <DownloadIcon />
                    </Button>
                  </a>
                </div>
              </Card>
              <br />
            </>
          );
        })
      ) : (
        <label>No Resources From Admin</label>
      )}

      {/* <Grid>
      <Grid container>
        <Grid item md={8}>
          <Typography variant="h6">Submit research topic</Typography>
          <Typography variant="h6" mt={4}>
            Charter submission
          </Typography>
          <Typography variant="h6" mt={4}>
            Presentation submissions
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Grid>
            <Button
              variant="contained"
              color="success"
              component="label"
              startIcon={<DriveFolderUploadIcon />}
            >
              <input type="file" />
            </Button>
          </Grid>
          <Grid mt={3}>
            <Button
              variant="contained"
              color="success"
              component="label"
              startIcon={<DriveFolderUploadIcon />}
            >
              <input type="file" />
            </Button>
          </Grid>
          <Grid mt={3}>
            <Button
              variant="contained"
              color="success"
              component="label"
              startIcon={<DriveFolderUploadIcon />}
            >
              <input type="file" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid> */}
    </>
  );
}

export default AdminDocument;
