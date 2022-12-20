import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
import {Bar} from "react-chartjs-2";
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  
 export const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
      legend: {
        position: 'top' ,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
// const barData = {
//     labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul '],
//     datasets: [{
//         label: ['Active'],
//         data: [12, 19, 3, 5, 2, 3, 1],
//         backgroundColor: ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink'],
//         borderColor: 'black',
//         borderWidth: 1,
//         }
//     ]
// }


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const barData = {
    labels,
    datasets: [
      {
        label: 'Active',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Inactive',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };
  

function BarChart() {
    return (
        <div>
            <Bar data={barData} options={options} />
        </div>
      

    );

  }

    export default BarChart;