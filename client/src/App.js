import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import ApplicantRegister from './Pages/Applicant/Register';
import EmployeeDashboard from './Pages/Employee/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ApplicantRegister />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
