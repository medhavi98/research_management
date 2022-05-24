import { Button, Grid, Typography } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import React, { useState } from "react";
import {Container} from "@mui/material";
import { storage } from "../../../firebase";
import { ref , uploadBytes,getDownloadURL } from "firebase/storage";
import axios from "axios";
const Submissions = () => {

  const [ResearchUploadFile, setResearchUploadFile ] = useState(); 
  const [rTemplate, setRTemplate] = useState({});
  
  const id = localStorage.getItem("abc")

  const submitResearchDoc = () => {
    const researchDetails = {
      templateFile: ResearchUploadFile,    

  };
  console.log('ruf',researchDetails);

  axios.post(`http://localhost:5001/fileUploadstd`,researchDetails).then(() => {
      window.alert("File Uploaded!");
  }).catch((err) => {
      window.alert("FIle is not uploaded successfully : " , err.message);
  });

  }

  const saveResearchDoc = ()  => {
    console.log("called button submitResearchDoc: ", rTemplate);
    const date = Date.now();
    console.log("u");
    const uploadTaskTemp = ref(storage,`UploadedResearchFile/${date}_${rTemplate.name}`);
    console.log("uq");
    uploadBytes(uploadTaskTemp, rTemplate).then((upload) => {
        console.log("upload : ", upload);
        
        getDownloadURL(upload.ref).then((url) => {
            console.log(url);
            setResearchUploadFile(url) //  this.setState({ ResearchUploadFile: url});
             setTimeout(submitResearchDoc(),2000)
             window.alert("uploaded")

        })
    })

}

  return (
    <>
      <Grid>
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
                <input type="file"  onChange={(e) => {
                  console.log("e is : ", e);
                  if(e.target.files[0]){
                    console.log('rTemplate :', e.target.files[0])
                    setRTemplate(e.target.files[0]);
                  }
                }} />
              </Button>
              <button
                    type="submit" 
                    value={"Upload Document"}
                    onClick = {saveResearchDoc} >Submit</button>
            </Grid>
            <Grid mt={3}>
              <Button
                variant="contained"
                color="success"
                component="label"
                startIcon={<DriveFolderUploadIcon />}
              >
                <input type="file"  onChange={(e) => {
                  console.log("e is : ", e);
                  if(e.target.files[0]){
                    console.log('rTemplate :', e.target.files[0])
                    setRTemplate(e.target.files[0]);
                  }
                }} />
              </Button>
              <button
                    type="submit" 
                    value={"Upload Document"}
                    onClick = {saveResearchDoc} >Submit</button>
            </Grid>
            <Grid mt={3}>
              <Button
                variant="contained"
                color="success"
                component="label"
                startIcon={<DriveFolderUploadIcon />}
              >
                <input type="file" onChange={(e) => {
                  if(e.target.files[0]){
                    console.log('rTemplate :', e.target.files[0])
                    setRTemplate(e.target.files[0]);
                  }
                }} />
              </Button>
              <button
                    type="submit" 
                    value={"Upload Document"}
                    onClick = {saveResearchDoc} >Submit</button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Submissions;
