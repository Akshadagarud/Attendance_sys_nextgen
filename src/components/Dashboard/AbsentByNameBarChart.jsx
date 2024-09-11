import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AbsentByNameBarChart = ({ attendanceData }) => {
  const uniqueNames = [...new Set(attendanceData.map(item => item.name))];
  const absentCounts = uniqueNames.map(name =>
    attendanceData.filter(item => item.name === name && item.work_status === 'Absent').length
  );

  const data = {
    labels: uniqueNames,
    datasets: [
      {
        label: 'Absent Count',
        data: absentCounts,
        backgroundColor: '#F31B4B',
      },
    ],
  };

  console.log('Absent by Name Data:', data);

  return (
    <div className="chart-container">
      <h2>Absent by Name</h2>
      <Bar data={data} />
    </div>
  );
};

export default AbsentByNameBarChart;
