import { Button, Card, Grid, Typography } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import TextFieldComponent from "../../Common/TextFieldComponent";
import axios from "axios";
import "./SubmissionsStyles.css";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

const Submissions = () => {
  const [ResearchUploadFile, setResearchUploadFile] = useState();
  const [submissionTitle, setSubmissionTitle] = useState();
  const [submittedDocuments, setSubmittedDocuments] = useState([]);
  const [rTemplate, setRTemplate] = useState({});
  const [id, setId] = useState();
  useEffect(() => {
    setId(localStorage.getItem("userId"));
    getGroupDocuments();
  }, []);

  const getGroupDocuments = () => {
    axios
      .get(
        `http://localhost:5001/groups/getGroupDocuments/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        console.log(response.data);
        setSubmittedDocuments(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitResearchDoc = (e) => {
    e.preventDefault();
    console.log("submissionTitle : ", submissionTitle);
    const researchDetails = {
      templateFile: ResearchUploadFile,
      submissionTitle: submissionTitle,
      id: localStorage.getItem("userId"),
    };
    console.log("ruf", researchDetails);

    axios
      .post(`http://localhost:5001/fileUploadstd`, researchDetails)
      .then(() => {
        window.alert("File Uploaded to Database!");
      })
      .catch((err) => {
        //window.alert("FIle is not uploaded successfully : ", err.message);
      });
  };

  const deleteSubmission = async (id) => {
    console.log("document id : ", id);
    await axios
      .delete(
        `http://localhost:5001/fileUploadstd/${id}/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        console.log("response : ", response);
        alert("Document Deleted");
      });
  };

  const saveResearchDoc = (e) => {
    e.preventDefault();
    console.log("called button submitResearchDoc: ", rTemplate);
    const date = Date.now();
    console.log("u");
    const uploadTaskTemp = ref(
      storage,
      `UploadedResearchFile/${date}_${rTemplate.name}`
    );
    console.log("uq");
    uploadBytes(uploadTaskTemp, rTemplate).then((upload) => {
      console.log("upload : ", upload);

      getDownloadURL(upload.ref).then((url) => {
        console.log(url);
        setResearchUploadFile(url); //  this.setState({ ResearchUploadFile: url});
        console.log("ResearchUploadFile 1", ResearchUploadFile);

        setTimeout(() => {
          console.log("ResearchUploadFile 2", ResearchUploadFile);
          submitResearchDoc(e);
          //setTimeout(submitResearchDoc(), 2000);
          window.alert("Uploaded to Firebase");
        }, 6000);
      });
    });
  };

  const onSubmit = (e) => {
    alert("value", submissionTitle);
  };

  return (
    <>
      <form onSubmit={(e) => saveResearchDoc(e)}>
        <TextFieldComponent
          label="Submission Title"
          inputName="submissionTitle"
          classes="form-field"
          width="100%"
          inputValue={submissionTitle}
          required
          handleChange={(e) => setSubmissionTitle(e.target.value)}
        />
        <br />
        <br />
        <label>Upload your document below</label>
        <br />
        <input
          type="file"
          onChange={(e) => {
            console.log("e is : ", e);
            if (e.target.files[0]) {
              console.log("rTemplate :", e.target.files[0]);
              setRTemplate(e.target.files[0]);
            }
          }}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{ float: "right" }}
        >
          Submit
        </Button>
      </form>
      <br />
      <br />
      <hr />
      <br />
      <label className="uploaded-label">Uploaded Documents</label>
      <br />
      <br />
      {submittedDocuments.map((doc, index) => {
        console.log("doc " + doc.submissionTitle);
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
                <Button onClick={() => deleteSubmission(doc._id)}>
                  <DeleteIcon />
                </Button>
              </div>
            </Card>
            <br />
          </>
        );
      })}
      <br />

      {/* <Grid>
        <Grid container>
          <Grid item md={8}>
            <Typography variant="h6">Introduction to the Research</Typography>
            <Typography variant="h6" mt={4}>
              Learn how to create a SRS
            </Typography>
            <Typography variant="h6" mt={4}>
              Sample charter document
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
                <input
                  type="file"
                  onChange={(e) => {
                    console.log("e is : ", e);
                    if (e.target.files[0]) {
                      console.log("rTemplate :", e.target.files[0]);
                      setRTemplate(e.target.files[0]);
                    }
                  }}
                />
              </Button>
              <button
                type="submit"
                value={"Upload Document"}
                onClick={saveResearchDoc}
              >
                Submit
              </button>
            </Grid>
            <Grid mt={3}>
              <Button
                variant="contained"
                color="success"
                component="label"
                startIcon={<DriveFolderUploadIcon />}
              >
                <input
                  type="file"
                  onChange={(e) => {
                    console.log("e is : ", e);
                    if (e.target.files[0]) {
                      console.log("rTemplate :", e.target.files[0]);
                      setRTemplate(e.target.files[0]);
                    }
                  }}
                />
              </Button>
              <button
                type="submit"
                value={"Upload Document"}
                onClick={saveResearchDoc}
              >
                Submit
              </button>
            </Grid>
            <Grid mt={3}>
              <Button
                variant="contained"
                color="success"
                component="label"
                startIcon={<DriveFolderUploadIcon />}
              >
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      console.log("rTemplate :", e.target.files[0]);
                      setRTemplate(e.target.files[0]);
                    }
                  }}
                />
              </Button>
              <button
                type="submit"
                value={"Upload Document"}
                onClick={saveResearchDoc}
              >
                Submit
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </>
  );
};

export default Submissions;
