import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import WorkStatusPieChart from './WorkStatusPieChart';
import LeaveStatusDonutChart from './LeaveStatusDonutChart';
import PresentByNameLineChart from './PresentByNameLineChart';
import AbsentByNameBarChart from './AbsentByNameBarChart';
import './Dashboard.css'
const supabase = createClient('https://kidbzlespbhlseivcosi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZGJ6bGVzcGJobHNlaXZjb3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4MzQzMjksImV4cCI6MjAzNTQxMDMyOX0.9GraLP8enw7jJhgUyD8A0_bL8sSGRF5h-5tByvo5ceY');

function FetchData() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('Attendance').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        // Ensure that the 'date' field is in the desired format (YYYY-MM-DD)
        const processedData = data.map(item => ({
          ...item,
          month: item.date.split('-')[1] // Extract the month part (MM)
        }));
        setAttendanceData(processedData);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Get unique months from the processed data
  const uniqueMonths = [...new Set(attendanceData.map(item => item.month))];
  const uniqueNames = [...new Set(attendanceData.map(item => item.name))];

  const filterData = () => {
    if (!attendanceData || attendanceData.length === 0) {
      return [];
    }
    return attendanceData.filter(item =>
      (selectedName ? item.name === selectedName : true) &&
      (selectedMonth ? item.month === selectedMonth : true)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="title-bar">
        <div className="logo-container">
          <img src="/Inmac-logo.png" alt="Inmac Logo" />
        </div>
        <h1>Employee Attendance Dashboard</h1>
      </div>

      <div className="card-row">
        <div className="card">
          <h2>Present</h2>
          <p>{filterData().filter(item => item.work_status === 'Present').length}</p>
        </div>
        <div className="card absent-card">
          <h2>Absent</h2>
          <p>{filterData().filter(item => item.work_status === 'Absent').length}</p>
        </div>
        <div className="filter-card">
          <h2>Name Filter</h2>
          <select value={selectedName} onChange={(e) => setSelectedName(e.target.value)}>
            <option value="">Select Name</option>
            {uniqueNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="filter-card">
          <h2>Month Filter</h2>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Select Month</option>
            {uniqueMonths.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="charts-row">
        <WorkStatusPieChart attendanceData={filterData()} />
        <LeaveStatusDonutChart attendanceData={filterData()} />
      </div>

      <div className="charts-row">
        <PresentByNameLineChart attendanceData={filterData()} />
        <AbsentByNameBarChart attendanceData={filterData()} />
      </div>
    </div>
  );
}

export default FetchData;