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

let dummyData = [
  {
    groupId: "GID001",
    topicName: "Test Name styled styled",
    topicDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    review: "Lorem Ipsum is simply dummy text of the ",
    isAccepted: false,
  },
  {
    groupId: "GID001",
    topicName: "Test Name styled styled",
    topicDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    review: "Lorem Ipsum is simply dummy text of the ",
    isAccepted: true,
  },
  {
    groupId: "GID001",
    topicName: "Test Name styled styled",
    topicDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    review: "Lorem Ipsum is simply dummy text of the ",
    isAccepted: false,
  },
];

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

  //   React.useEffect(() => {
  //     fetchRequest();
  //     console.log(fetchRequest() + 'fetc');
  //   }, []);

  //   const fetchRequest = async () => {
  //     const res = await axios.get(`${BASE_URL}/requests/getRequests/:groupId`);
  //     console.log(res.data.requests);
  //     setRequests(res.data.requests);
  //   };

  return (
    <>
      <diV>
        <Grid md={12} xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>GroupID</StyledTableCell>
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
                {dummyData.map((row) => (
                  <StyledTableRow key={row.groupId}>
                    <StyledTableCell component="th" scope="row">
                      {row.groupId}
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
                      {row.isAccepted === true ? "Accept" : "Reject"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      <Button variant="outlined">Test</Button>
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
