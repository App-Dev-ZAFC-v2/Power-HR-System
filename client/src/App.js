// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//auth
import Login from "./Pages/Authentication/Login/Login";
import ApplicantRegister from "./Pages/Applicant/Register";
//dashboard
// import AdminDashboard from "./Pages/Admin/Dashboard";
import EmployeeDashboard from "./Pages/Employee/Dashboard";
import ExecutiveDashboard from "./Pages/Executive/Dashboard";
import ApplicantDashboard from "./Pages/Applicant/Dashboard";

//profileupdate
import ManageJob from "./Pages/Admin/ManageJob";
import UpdateJob from "./Pages/Admin/UpdateJob";

//profile update
import ManageEmployee from "./Pages/Admin/ManageEmployee";
import UpdateEmployee from "./Pages/Admin/UpdateEmployee";
import Profile from "./Pages/User/Profile";
import UpdateUsername from "./Pages/User/Pages/updateusername";
import UpdatePassword from "./Pages/User/Pages/updatepassword";

import JobPage from "./Pages/Applicant/JobPage";
// import AddJob from "./Pages/Admin/AddJob";
import ViewApplication from "./Pages/Applicant/ViewApplication";

import ShortlistApplicant from "./Pages/Executive/ManageApplicant";

import ManageForms from "./Pages/Survey/Form/ManageForms";
import EditForm from "./Pages/Survey/Form/EditForm";

import ManageAnalytics from "./Pages/Executive/Analytics";

import ReviewEmployee from "./Pages/Executive/ReviewFeedback";

import SurveyForm from "./Pages/Survey/Feedback/SurveyForm";
import QuestionPage from "./Pages/Survey/Feedback/QuestionPage";
import ResponseView from "./Pages/Survey/Form/ResponseView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ApplicantRegister />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/executive/dashboard" element={<ExecutiveDashboard />} />
        <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        <Route path="/admin/manage-job" element={<ManageJob />} />
        <Route path="/admin/update-job" element={<UpdateJob />} />
        <Route path="/admin/update-job/:id" element={<UpdateJob />} />
        <Route path="/admin/manage-employee" element={<ManageEmployee />} />
        <Route path="/admin/update-employee" element={<UpdateEmployee />} />
        <Route path="/admin/update-employee/:id" element={<UpdateEmployee />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/manage-forms" element={<ManageForms />} />

        <Route path="/form/edit-form/:id" element={<EditForm />} />
        <Route path="/form" element={<SurveyForm />} />
        <Route path="/form/:id" element={<QuestionPage />} />
        <Route path="/form/response/:id" element={<ResponseView />} />

        <Route path="/profile/update-username" element={<UpdateUsername />} />
        <Route path="/profile/update-password" element={<UpdatePassword />} />
        <Route path="/applicant/jobs" element={<JobPage />} />
        <Route
          path="/applicant/jobs/:search/:specialization"
          element={<JobPage />}
        />
        <Route
          path="/applicant/view-application"
          element={<ViewApplication />}
        />

        <Route
          path="/executive/manage-applicant"
          element={<ShortlistApplicant />}
        />

        <Route path="/executive/analytics" element={<ManageAnalytics />} />

        <Route path="/executive/review-feedback" element={<ReviewEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
