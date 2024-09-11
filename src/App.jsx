import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Form from './components/Login_form/Form';
import LeaveForm from './components/LeaveForm/LeaveForm';
import Dashboard from './components/Dashboard/Dashboard';
import './index.css'; // Import global styles

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <Link to="/form/login">Login Form</Link>
            <Link to="/form/leave">Leave Form</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
          <div className="header-title">
            <h1>Welcome to Inmac Digital</h1>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/form/login" element={<Form />} />
            <Route path="/form/leave" element={<LeaveForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Form />} /> {/* Default route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
