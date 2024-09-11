import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './LeaveForm.css'; // For custom styling

function LeaveForm() {
  const [empId, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [leaveStatus, setLeaveStatus] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    setDate(currentDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('LeaveRequests') // Replace with your actual table name
      .insert([{ 
        emp_id: empId, 
        name, 
        date, 
        leave_status: leaveStatus 
      }]);

    if (error) {
      console.error('Error inserting data:', error);
      setMessage('Error submitting leave request. Please try again.');
      setMessageType('error');
    } else {
      console.log('Leave request submitted successfully:', data);
      setMessage('Leave request submitted successfully!');
      setMessageType('success');
      // Reset form fields
      setEmpId('');
      setName('');
      setLeaveStatus('');
    }
  };

  return (
    <div className="leave-form-container">

      <form onSubmit={handleSubmit}>
      <img src="/Inmac-logo.png" alt="Inmac Logo" className="logo" />
        <h2>Leave Application</h2>
        <div className="form-group">
          <label>ID:</label>
          <input
            type="text"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Leave Status:</label>
          <select
            value={leaveStatus}
            onChange={(e) => setLeaveStatus(e.target.value)}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Holiday">Holiday</option>
            <option value="Weekoff">Weekoff</option>
          </select>
        </div>
        <button type="submit">Submit</button>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default LeaveForm;
