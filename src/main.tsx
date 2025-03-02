import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home/Home.tsx'
import EmployeeList from './pages/EmployeeList/EmployeeList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </Router>
  </StrictMode>
)
