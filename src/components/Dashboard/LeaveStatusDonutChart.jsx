import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LeaveStatusDonutChart = ({ attendanceData }) => {
  const leaveStatusData = {
    labels: ['Present', 'Casual Leave', 'Sick Leave', 'Weekoff'],
    datasets: [
      {
        data: [
          attendanceData.filter(item => item.leave_status === 'Present').length,
          attendanceData.filter(item => item.leave_status === 'Casual Leave').length,
          attendanceData.filter(item => item.leave_status === 'Sick Leave').length,
          attendanceData.filter(item => item.leave_status === 'Weekoff').length,
        ],
        backgroundColor: ['#36A8A4', '#FFCE56', '#FF6384', '#F5AFE9'],
        hoverBackgroundColor: ['#36A8A4', '#FFCE56', '#FF6384', '#F5AFE9'],
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
    cutout: '40%',  
    radius: '80%',  
  };

  return (
    <div className="chart-container">
      <h2>Leave Status</h2>
      <Doughnut data={leaveStatusData} options={options} />
    </div>
  );
};

export default LeaveStatusDonutChart;