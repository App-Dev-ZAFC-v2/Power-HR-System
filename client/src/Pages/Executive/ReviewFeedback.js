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
          <h1>Review Employee Feedback</h1>
        </Typography>
        <Typography align="center">
          <h6>
            Employee will try to review the feedback and display it in the chart
            form.
          </h6>
          <p>Basically display form list - employee select, then pop up the questions</p>
        </Typography>
        <br></br>
        {/* <ShortlistTable {...applicants} /> */}
        <FormFeedback />
      </div>
    </>
  );
}

export default ReviewEmployee;
