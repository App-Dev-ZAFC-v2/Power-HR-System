/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import { Button } from "react-bootstrap";
// import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  // {
  //   id: "email",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Email",
  // },
  // { id: "contact", numeric: false, disablePadding: false, label: "Contact" },
  {
    id: "jobApplied",
    numeric: false,
    disablePadding: false,
    label: "Job Applied",
  },
  // {
  //   id: "qualification",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Qualification",
  // },
  {
    id: "dateApplied",
    numeric: false,
    disablePadding: false,
    label: "Date Applied",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ShortlistTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  // const [shortlist, setShortlist] = useState(false);
  // const [reject, setReject] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  const [details, setDetails] = useState("");

  const [data, setData] = useState({
    applicationStatus: "",
  });
  
  const [status, setStatus] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/applicants", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRows(res.data);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleClickOpen = (id) => {
    setDetails(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShortlist = async (e) => {
    // e.preventDefault();
    axios
      .patch(`http://localhost:5000/applications/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        status: data.applicationStatus,
      })
      .then((res) => {
        console.log(res.data);
        window.location.href = `/executive/manage-applicant`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            padding="default"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.jobApplied}</TableCell>
                      <TableCell align="center">{row.dateApplied}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        <Button
                          key={row._id}
                          color="primary"
                          onClick={() => handleClickOpen(row._id)}
                        >
                          {" "}
                          Details
                        </Button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Candidate Details"}
                          </DialogTitle>
                          <DialogContent>
                            {rows.map((row) => {
                              if (row._id === details) {
                                return (
                                  <DialogContentText
                                    id="alert-dialog-description"
                                    scope="row"
                                  >
                                    Name: {row.name}
                                    <br />
                                    Email: {row.email}
                                    <br />
                                    Phone: {row.contact}
                                    <br />
                                    Qualification: {row.qualification}
                                  </DialogContentText>
                                );
                              }
                            })}
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() =>
                                handleShortlist(() =>
                                  setStatus({ status: "Shortlist" })
                                )
                              }
                              variant="success"
                            >
                              Shortlist
                            </Button>
                            <Button
                              onClick={() =>
                                handleShortlist(() =>
                                  setStatus({ status: "Not Shortlist" })
                                )
                              }
                              variant="danger"
                            >
                              Not Shortlist
                            </Button>
                            <Button onClick={handleClose}>Close</Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
