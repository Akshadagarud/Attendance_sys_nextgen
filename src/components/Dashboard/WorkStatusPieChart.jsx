import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const WorkStatusPieChart = ({ attendanceData }) => {
  const workStatusData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [
          attendanceData.filter(item => item.work_status === 'Present').length,
          attendanceData.filter(item => item.work_status === 'Absent').length,
        ],
        backgroundColor: ['#4caf50', '#d84343'],
        hoverBackgroundColor: ['#4caf50', '#d84343'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',  
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;  
          },
        },
      },
    },
    radius: '80%',
  };

  return (
    <div className="chart-container">
      <h2>Work Status</h2>
      <Pie data={workStatusData} options={options} />
    </div>
  );
};

export default WorkStatusPieChart;