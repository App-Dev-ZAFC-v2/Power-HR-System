// import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Typography } from "@mui/material";
import FormFeedback from "../../Components/Executive/FormFeedback";

function ReviewEmployee() {

  return (
    <>
      <Navbar />
      <br></br>
      <div className="container">
        <Typography align="center">
          <h1>Review Employee Survey Response</h1>
        </Typography>
        <Typography align="center">
          <p>Basically display employee list - when select, pop up questions answered</p>
        </Typography>
        <br></br>
        {/* <ShortlistTable {...applicants} /> */}
        <FormFeedback />
      </div>
    </>
  );
}

export default ReviewEmployee;
