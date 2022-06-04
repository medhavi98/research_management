import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { getUserSessionDetails } from "../../../helpers/userSessionHandler";
import FormDialog from "../../Common/FormDialog";
import UpdateStudentRequest from "./UpdateStudentRequest";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StudentRequest = () => {
  const [requests, setRequests] = React.useState([]);
  const { userId } = getUserSessionDetails();

  React.useEffect(() => {
    fetchRequest();
  }, []);

  const fetchRequest = async () => {
    const res = await axios.get(
      `${BASE_URL}/requests/getRequestsByUserId/${userId}`
    );
    setRequests(res.data.requests);
  };

  const handelOnSubmit = async (e, review, status, id, groupId) => {
    e.preventDefault();
    const res = await axios.post(`${BASE_URL}/requests/edit/${id}`, {
      requestDetails: {
        review,
        status,
      }
    })
    if (status === "Approved") {
      await axios.post(`${BASE_URL}/groups/edit/${groupId}`, {
        groupDetails: {
          supervisorId: userId,
        }
      });
    }
    if (res.status === 200) {
      const res = await axios.get(
        `${BASE_URL}/requests/getRequestsByUserId/${userId}`
      );
      setRequests(res.data.requests);
    }
  };

  return (
    <>
      <diV>
        <Grid md={12} xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Group Name</StyledTableCell>
                  <StyledTableCell>Topic Name</StyledTableCell>
                  <StyledTableCell align="center">
                    Topic Description{" "}
                  </StyledTableCell>
                  <StyledTableCell align="center">Review</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row.groupName}
                    </StyledTableCell>
                    <StyledTableCell align="justify" style={{ width: "12%" }}>
                      {row.topicName}
                    </StyledTableCell>
                    <StyledTableCell align="justify" style={{ width: "40%" }}>
                      {row.topicDescription}
                    </StyledTableCell>
                    <StyledTableCell align="justify" style={{ width: "25%" }}>
                      {row.review}
                    </StyledTableCell>
                    <StyledTableCell align="justify">
                      {row.status}
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormDialog
                        testButton="Update"
                        Description="Add Your Research Group Member Details"
                        onButtonPress={() => {
                          console.log("group details");
                        }}
                        children={<UpdateStudentRequest id={row._id} handelOnSubmit={(e, review, reviewStatus) => { handelOnSubmit(e, review, reviewStatus, row._id, row.groupId) }} />}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </diV>
    </>
  );
};

export default StudentRequest;
