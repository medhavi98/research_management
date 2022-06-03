import React, { useEffect, useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import "../../Student/DocumentSubmission/SubmissionsStyles.css";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextFieldComponent from "../../Common/TextFieldComponent";
import CheckBox from "../../Common/CheckBox";
import axios from "axios";

function SubmittedDocView() {
  const [submittedDocuments, setSubmittedDocuments] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [editInfo, setEditInfo] = React.useState({});
  const [submissionTitle, setSubmissionTitle] = useState();
  const [uploadType, setUploadType] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getGroupDocuments();
  }, []);

  const editSubmission = (id) => {
    for (let i = 0; i < submittedDocuments.length; i++) {
      if (submittedDocuments[i]._id === id) {
        setEditInfo(submittedDocuments[i]);
        setSubmissionTitle(submittedDocuments[i].submissionTitle);
      }
    }
    console.log("edit information", editInfo);
    handleClickOpen();
  };

  const submitEditedInfo = (id) => {
    alert(id);
    console.log("edit information", uploadType);
    let permissions = editInfo.permissions;
    if (JSON.stringify(uploadType) === JSON.stringify(editInfo.permissions)) {
      permissions = uploadType;
    }
    const newInfo = {
      templateFile: editInfo.templateFile,
      submissionTitle: submissionTitle,
      permissions: permissions,
    };

    axios
      .put(`http://localhost:5001/adminDocumentUploadRouter/${id}`, newInfo)
      .then((response) => {
        console.log("response : ", response);
        alert("Information Updated successfully");
      })
      .catch((error) => {
        console.log("error : ", error);
        alert("Information Updated failed");
      });
    handleClose();
  };

  const deleteSubmission = async (id) => {
    console.log("document id : ", id);
    await axios
      .delete(`http://localhost:5001/adminDocumentUploadRouter/${id}`)
      .then((response) => {
        console.log("response : ", response);
        alert("Document Deleted");
      });
  };

  const staffTypeHandler = (type) => {
    console.log("type : ", type);
    if (!uploadType.includes(type)) {
      console.log("fff");
      setUploadType([...uploadType, type]);
    } else {
      console.log("fffdddd");
      const newArray = uploadType.filter((value) => {
        return value !== type;
      });
      setUploadType(newArray);
    }
  };

  const getGroupDocuments = () => {
    axios
      .get(`http://localhost:5001/adminDocumentUploadRouter`)
      .then((response) => {
        console.log(response.data);
        setSubmittedDocuments(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const category = [{ checkBoName: "Student" }, { checkBoName: "Staff" }];

  return (
    <div>
      {submittedDocuments.map((doc, index) => {
        console.log("doc " + doc.submissionTitle);
        return (
          <>
            <Card variant="outlined" className="uploaded-card" key={doc._id}>
              <Typography variant="h6" mt={1} mb={1} ml={2} mr={1}>
                {doc.submissionTitle}
              </Typography>
              <Typography variant="h7" mt={1} mb={1} ml={2} mr={1}>
                {"Permissions - " + doc.permissions}
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
                <Button onClick={() => editSubmission(doc._id)}>
                  <EditIcon />
                </Button>
              </div>
            </Card>
            <br />
          </>
        );
      })}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Document Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you want to edit documentation details, please enter the new
            information.
          </DialogContentText>
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

          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => submitEditedInfo(editInfo._id)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SubmittedDocView;