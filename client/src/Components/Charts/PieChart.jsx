import React from "react";
import {Pie} from "react-chartjs-2";


import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from "chart.js";
  


ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Active', 'Inactive'],
  datasets: [{
      label: '369',
      data: [12, 19],
      backgroundColor: ['blue', 'red'],
      borderColor: 'black',
      borderWidth: 1,
      }
  ]
}
    

const options = {}

function PieChart() {
    return (
        <div>
            <Pie data={data} options={options}/>
            <div
            style={
                {
                  padding : "10px",
                  width: "10px",

            }
          }
            >
            </div>
        </div>
    
    );

  }

    export default PieChart;

