import React, { useEffect, useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import axios from "axios";

function StudentDocuments() {
  const [submittedDocuments, setSubmittedDocuments] = useState([]);

  useEffect(() => {
    console.log("hhgf");
    getStudentSubmissions();
  }, []);

  const getStudentSubmissions = async () => {
    await axios
      .get(
        `http://localhost:5001/groups/studentsDoc/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        console.log(response.data);
        setSubmittedDocuments(response.data);
        console.log("submittedDocuments", submittedDocuments);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {submittedDocuments ? (
        submittedDocuments.map((doc, index) => {
          console.log("doc " + doc.groupName);
          return (
            <>
              <label>
                <b>{doc.groupName}</b>
              </label>
              <hr />
              <br />
              {doc.groupDocuments.map((doc1, index) => {
                return (
                  <>
                    <Card
                      variant="outlined"
                      className="uploaded-card"
                      key={doc1._id}
                    >
                      <Typography variant="h6" mt={1} mb={1} ml={2} mr={1}>
                        {doc1.submissionTitle}
                      </Typography>
                      <div className="uploaded-card-Btn">
                        <a href={doc1.templateFile}>
                          <Button>
                            <DownloadIcon />
                          </Button>
                        </a>
                      </div>
                    </Card>
                    <br />
                  </>
                );
              })}
            </>
          );
          <br />;
        })
      ) : (
        <label>No Resources From Students</label>
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

export default StudentDocuments;
