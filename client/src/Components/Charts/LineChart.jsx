import React from "react";
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Employee Status Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Active',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Inactive',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};

 function LineChart() {
  return <Line options={options} data={data} />;
}

export default LineChart;

