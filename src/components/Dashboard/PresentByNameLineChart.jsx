import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PresentByNameLineChart = ({ attendanceData }) => {
  const uniqueNames = [...new Set(attendanceData.map(item => item.name))];
  const presentCounts = uniqueNames.map(name =>
    attendanceData.filter(item => item.name === name && item.work_status === 'Present').length
  );

  const data = {
    labels: uniqueNames,
    datasets: [
      {
        label: 'Present Count',
        data: presentCounts,
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
      },
    ],
  };

  console.log('Present by Name Data:', data);

  return (
    <div className="chart-container">
      <h2>Present by Name</h2>
      <Line data={data} />
    </div>
  );
};

export default PresentByNameLineChart;
