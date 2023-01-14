import React, { useEffect, useState } from "react";
// import axios from "axios";
import Navbar from "../../Components/Old Components/Navbar";
import ShortlistTable from "../../Components/Executive/ShortlistTable";
import { Typography } from "@mui/material";
import { DashboardLayout } from "../../Components/Executive/Dashboard/dashboard-layout";

function ShortlistApplicant() {
  const [applicants, setApplicant] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("https://powerhr-server.azurewebsites.net/applicants", {
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
      <DashboardLayout tab="Manage Applicant">
      <br></br>
      <div className="container">
        <Typography variant="h6" align="center">
            Applicants who applied the job offered may be shortlisted based on
            their qualification
        </Typography>
        <br></br>
        <ShortlistTable {...applicants} />
      </div>
      </DashboardLayout>
    </>
  );
}

export default ShortlistApplicant;
