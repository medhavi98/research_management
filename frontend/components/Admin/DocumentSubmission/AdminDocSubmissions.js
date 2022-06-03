import { Button, Grid, Typography } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import React, { useState } from "react";
import { Container } from "@mui/material";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import TextFieldComponent from "../../Common/TextFieldComponent";
import CheckBox from "../../Common/CheckBox";
import "../../Student/DocumentSubmission/SubmissionsStyles.css";

import axios from "axios";
const AdminDocSubmissions = () => {
  const [ResearchUploadFile, setResearchUploadFile] = useState();
  const [rTemplate, setRTemplate] = useState({});
  const [submissionTitle, setSubmissionTitle] = useState();
  const [uploadType, setUploadType] = useState([]);

  const category = [{ checkBoName: "Student" }, { checkBoName: "Staff" }];

  const staffTypeHandler = (type) => {
    if (!uploadType.includes(type)) {
      setUploadType([...uploadType, type]);
    } else {
      const newArray = uploadType.filter((value) => {
        return value !== type;
      });
      setUploadType(newArray);
    }
  };

  const submitResearchDoc = (e) => {
    e.preventDefault();
    const researchDetails = {
      templateFile: ResearchUploadFile,
      submissionTitle: submissionTitle,
      permissions: uploadType,
    };
    console.log("ruf", researchDetails);

    axios
      .post(`http://localhost:5001/adminDocumentUploadRouter`, researchDetails)
      .then((response) => {
        window.alert("File Uploaded to database!");
      })
      .catch((err) => {
        window.alert("FIle is not uploaded successfully : ", err.message);
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
          // setTimeout(submitResearchDoc(), 2000);
          submitResearchDoc(e);
          window.alert("Url saved to firebase");
        }, 6000);
      });
    });
  };

  return (
    <>
      <form onSubmit={(e) => saveResearchDoc(e)}>
        <TextFieldComponent
          label="Upload Title"
          inputName="submissionTitle"
          classes="form-field"
          width="100%"
          inputValue={submissionTitle}
          required
          handleChange={(e) => setSubmissionTitle(e.target.value)}
        />
        <br />
        <br />
        <label>Set Access permissions</label>
        <CheckBox
          options={category}
          onChange={(e) => staffTypeHandler(e.target.value)}
        />

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
        <br />
        <br />
      </form>
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

export default AdminDocSubmissions;
