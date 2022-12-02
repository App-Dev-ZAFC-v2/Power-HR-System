import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

import { loginUser } from './controllers/user.js';
import userRoutes from './routes/user.js';
import employeeRoutes from './routes/employee.js'; // import the employee router
import adminRoutes from './routes/admin.js'; // import the admin router
import applicantRoutes from './routes/applicant.js'; // import the applicant router
import jobRoutes from './routes/job.js'; // import the job router
import feedbackRoutes from './routes/feedback.js'; // import the feedback router
import applicationRoutes from './routes/application.js'; // import the application router


const app = express();

app.use(cors()); // to allow cross-origin requests
app.use(bodyParser.json({ limit: '30mb', extended: true })); // limit is the size of the image that can be uploaded
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true })); // limit is the size of the image that can be uploaded

app.use('/users', userRoutes); // use the user router
app.use('/employees', employeeRoutes); // when a request is made to the /employees endpoint, use the employeeRoutes router
app.use('/admins', adminRoutes); // when a request is made to the /admins endpoint, use the adminRoutes router
app.use('/applicants', applicantRoutes); // when a request is made to the /applicants endpoint, use the applicantRoutes router
app.use('/feedbacks', feedbackRoutes); // when a request is made to the /feedbacks endpoint, use the feedbackRoutes router
app.use('/jobs', jobRoutes); // when a request is made to the /job endpoint, use the jobRoutes router')
app.use('/applications', applicationRoutes); // when a request is made to the /application endpoint, use the applicationRoutes router


app.post('/login', loginUser); // when a request is made to the /login endpoint, use the loginUser function

const PORT = process.env.PORT || 5000; // if there is a port in the environment variable, use that, otherwise use 5000

mongoose.connect(process.env.DB_URL) // connect to the database
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))) // if the connection is successful, start the server
    .catch((error) => console.log(error.message)); // if the connection is not successful, log the error message