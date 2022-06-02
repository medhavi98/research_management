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
    submissionType: "Test Name styled styled",
    marks: "45",
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

const StudentMarks = () => {
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
                  <StyledTableCell>Submission Type</StyledTableCell>
                  <StyledTableCell>Marks</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyData.map((row) => (
                  <StyledTableRow key={row.groupId}>
                    <StyledTableCell component="th" scope="row">
                      {row.groupId}
                    </StyledTableCell>
                    <StyledTableCell align="justify">
                      {row.submissionType}
                    </StyledTableCell>
                    <StyledTableCell align="justify">
                      {row.marks}
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

export default StudentMarks;
