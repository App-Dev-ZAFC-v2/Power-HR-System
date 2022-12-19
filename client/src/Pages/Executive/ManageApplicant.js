import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import ShortlistTable from "../../Components/Executive/ShortlistTable";
import { Typography } from "@mui/material";

function ShortlistApplicant() {
  const [applicants, setApplicant] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/applicants", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setApplicant(res.data);
  //       // setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <Navbar />
      <br></br>
      <div className="container">
        <Typography align="center">
          <h1>Manage application</h1>
        </Typography>
        <Typography align="center">
          <h6>
            Applicants who applied the job offered may be shortlisted based on
            their qualification
          </h6>
        </Typography>
        <br></br>
        <ShortlistTable {...applicants} />
      </div>
    </>
  );
}

export default ShortlistApplicant;
