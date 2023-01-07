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
import { Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getResponseByEmployeeID } from "../../Redux/slices/response";

export default function ViewForm(props) {
  const form = props.dataform;
  const { id } = useParams();
  const response = useSelector((state) => state.responses.feedback);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.responses.loading);

  const token = localStorage.getItem("authToken");
  const detailId = JSON.parse(atob(token.split(".")[1])).detailId;

  useEffect(() => {
    dispatch(getResponseByEmployeeID(detailId));
  }, [dispatch, id]);

  function checkStatus(id) {
    //if id not match with in response id, return "Not Filled"
    //if id found in response and draft = true, return "Pending"
    //if id found in response and draft = false, return "Filled"
    const checkResponse = response?.find((res) => res.formID === id);
    if (!checkResponse) {
      return "Not Filled";
    } else if (checkResponse.draft === true) {
      return "Pending";
    } else {
      return "Filled";
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {form?.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.name}
              </TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="center">{status[index]}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => (window.location = "/form/" + row._id)}
                >
                  Fill <DescriptionIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
