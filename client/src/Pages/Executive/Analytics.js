import React from "react";
import Navbar from "../../Components/Navbar";
import { Typography } from "@mui/material";


import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  } from "chart.js";
  
import {Bar} from "react-chartjs-2";
import {Doughnut} from "react-chartjs-2";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: '369',
        data: [12, 19, 3, 5, 2, 3, 1],
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1,
        }
    ]
}

const options = {}

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
          
          <Bar
                data={data}
                options={options}
                    >
            </Bar>

        </div>
      </>

      

    );

  }

    export default ManageAnalytics;