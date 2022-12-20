// import React, { useState, useEffect } from 'react';
import React from 'react';
import Navbar from "../../Components/Navbar";
import { Typography } from "@mui/material";
import BarChart from "../../Components/Charts/BarChart";
import DoughnutChart from "../../Components/Charts/DoughnutChart";
import PieChart from "../../Components/Charts/PieChart";
//import axios from 'axios';

function ManageAnalytics() {
  // const [chartData, setChartData] = useState({});

  // useEffect(() => {
  //    axios.get('http://localhost:5000/', {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //     },
  //    })
  //   .then(response => {
  //     console.log(response);
  //     chart();
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  //     const data = response.data;

  //     // Extract the data for the chart from the API response
  //     const labels = data.map(datum => datum.label);
  //     const chartDataValues = data.map(datum => datum.value);

  //     setChartData({
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: 'Data from API',
  //           data: chartDataValues,
  //           backgroundColor: [
  //             'rgba(255, 99, 132, 0.6)',
  //             'rgba(54, 162, 235, 0.6)',
  //             'rgba(255, 206, 86, 0.6)',
  //             'rgba(75, 192, 192, 0.6)',
  //             'rgba(153, 102, 255, 0.6)',
  //             'rgba(255, 159, 64, 0.6)',
  //             'rgba(255, 99, 132, 0.6)'
  //           ]
  //         }
  //       ]
  //     });
  //   }

  // }, []);

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
      <BarChart />
      <DoughnutChart />
      <PieChart />



    </div>

    {/* <div>
      <Line
        data={chartData}
        options={{
          title: {
            display: true,
            text: 'Data from API',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div> */}
    </>
  );
}

export default ManageAnalytics;

