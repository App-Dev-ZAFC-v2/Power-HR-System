import React from "react";


import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  } from "chart.js";
  
import {Bar} from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: ['Active', 'Inactive', 'Pending', 'Declined', 'Approved', 'Cancelled', 'Completed'],
        data: [12, 19, 3, 5, 2, 3, 1],
        backgroundColor: ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'pink'],
        borderColor: 'black',
        borderWidth: 1,
        }
    ]
}

const options = {}

function BarChart() {
    return (
        <div>
            <Bar data={barData} options={options} />
        </div>
      

    );

  }

    export default BarChart;