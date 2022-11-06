import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import ApplicantRegister from './Pages/ApplicantRegister';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ApplicantRegister />} />
      </Routes>
    </div>
  );
}

export default App;
