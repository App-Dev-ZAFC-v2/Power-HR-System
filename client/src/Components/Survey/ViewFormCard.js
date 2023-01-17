// import React from "react";
// import { Card, Grid, Typography, CardActionArea } from "@mui/material";

// export default function ViewForm(props) {
//   const form = props.dataform;

//   return (
//     <>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card
//           sx={{
//             boxShadow: 5,
//             borderRadius: 2,
//           }}
//         >
//           <CardActionArea
//             onClick={() => (window.location = "/form/" + form._id)}
//           >
//             <Typography
//               sx={{
//                 display: "-webkit-box",
//                 overflow: "hidden",
//                 WebkitBoxOrient: "vertical",
//                 WebkitLineClamp: 1,
//               }}
//               gutterBottom
//               variant="h4"
//               component="div"
//               ml={2}
//               mt={2}
//             >
//               {form.name}
//             </Typography>
//             <Typography
//               sx={{
//                 display: "-webkit-box",
//                 overflow: "hidden",
//                 WebkitBoxOrient: "vertical",
//                 WebkitLineClamp: 3,
//               }}
//               variant="body2"
//               color="text.secondary"
//               height={50}
//               ml={3}
//             >
//               {form.description}
//             </Typography>
//           </CardActionArea>
//         </Card>
//       </Grid>
//     </>
//   );
// }

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Chip, Box } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getResponseByEmployeeID } from "../../Redux/slices/response";
import { TablePagination } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

function TablePaginationActions(props) {
  const form = props.dataform;
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(title, description) {
  return { title, description };
}

//define form data

export default function ViewForm() {
  const form = useSelector((state) => state.forms.form);
  const response = useSelector((state) => state.responses.feedback);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.responses.loading);

  const token = localStorage.getItem("authToken");
  const detailId = JSON.parse(atob(token.split(".")[1])).detailId;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    dispatch(getResponseByEmployeeID(detailId));
  }, [detailId]);

  function checkStatus(id) {
    //if id not match with in response id, return "Not Filled"
    //if id found in response and draft = true, return "Pending"
    //if id found in response and draft = false, return "Filled"
    const checkResponse = response?.find((res) => res.formID === id);
    if (!checkResponse) {
      return <Chip label="Not Answered" color="error" size="small" />;
    } else if (checkResponse.draft === true) {
      return <Chip label="Answer Pending" color="warning" size="small" />;
    } else {
      return <Chip label="Answer Completed" color="success" size="small" />;
    }
  }

  const [status, setStatus] = React.useState([]);

  useEffect(() => {
    const temp = [];
    form?.map((row) => {
      temp.push(checkStatus(row._id));
    });
    setStatus(temp);
  }, [form]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - form?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ minWidth: 200, maxWidth: 1000, boxShadow: 10 }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ borderColor: "grey.500" }}>
              <TableCell>Question Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? form?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : form
            )?.map((row, index) => (
              // {form?.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{
                  // "&:last-child td, &:last-child th": { border: 0 },
                  borderColor: "grey.300",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ borderColor: "grey.300" }}
                >
                  {row?.name}
                </TableCell>
                <TableCell align="center" sx={{ borderColor: "grey.300" }}>
                  {row.description}
                </TableCell>
                <TableCell align="center" sx={{ borderColor: "grey.300" }}>
                  {status[index + page * rowsPerPage]}
                </TableCell>
                <TableCell align="center" sx={{ borderColor: "grey.300" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => (window.location = "/form/" + row._id)}
                    width="100%"
                    endIcon={<DescriptionIcon />}
                  >
                    Fill
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={4}
              count={form?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
