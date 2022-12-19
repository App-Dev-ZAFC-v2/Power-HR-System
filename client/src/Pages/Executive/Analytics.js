import React from "react";
import Navbar from "../../Components/Navbar";
import { Typography } from "@mui/material";
import BarChart from "../../Components/Charts/BarChart";
import DoughnutChart from "../../Components/Charts/DoughnutChart";
import PieChart from "../../Components/Charts/PieChart";


function ManageAnalytics() {
    return (
        <>
        <Navbar />
        <br></br>
        <div className="container">
          <Typography align="center">
            <h1>Employee Analytics</h1>
          </Typography>
          <Typography align="center">
            <h6>
             This page shows the active and inactive employees in this company.

            </h6>
          </Typography>
          <br></br>
          
          <BarChart/>
            <br></br>
            <DoughnutChart/>
            <br></br>
            <PieChart/>

        </div>
      </>

      

    );

  }

    export default ManageAnalytics;