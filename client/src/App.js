import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import ApplicantRegister from './Pages/Applicant/Register';
import EmployeeDashboard from './Pages/Employee/Dashboard';
import AdminDashboard from './Pages/Admin/Dashboard';
import ManageEmployee from './Pages/Admin/ManageEmployee';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ApplicantRegister />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-employee" element={<ManageEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
