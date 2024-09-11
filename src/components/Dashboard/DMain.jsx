import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dashboard from './Dashboard.jsx'
import './DashboardIndex.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
)
