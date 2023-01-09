import React from "react";
import {Doughnut} from "react-chartjs-2";


import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from "chart.js";
import { Box } from "@mui/material";
  


  ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ['Active', 'Inactive'],
//   datasets: [{
//       label: '369',
//       data: [12, 19],
//       backgroundColor: ['blue', 'red'],
//       borderColor: 'black',
//       borderWidth: 1,
//       }
//   ]
// }

export const data = {
  labels: ['Active', 'Inactive'],  datasets: [
    {
      label: 'Employee Status',
      data: [12, 19],
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(75, 192, 192)',

      ],
      borderColor: [
        'rgba(255, 99, 132)',
        'rgba(75, 192, 192)',
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Employee Status Doughnut Chart',
    },
  },


}

function DoughnutChart() {
    return (
        <Doughnut data={data} options={options}/>
    );

  }

    export default DoughnutChart;

