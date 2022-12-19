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

  function BarChart() {
    return (
        <div>
            <Bar
                data={data}
                options={options}
                    >
            </Bar>
        </div>  

    );

  }

    export default BarChart;