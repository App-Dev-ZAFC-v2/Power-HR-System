import express from 'express'; // import express
// import authenicate middleware
import { AuthToken } from '../middleware/Auth.js';

import { getEmployees, createEmployee, getEmployeeByID, updateEmployee, deleteEmployee, registerEmployee} from '../controllers/employee.js'; // import the getEmployees and createEmployee functions from the employee controller

const router = express.Router(); // create a router

router.get('/', AuthToken, getEmployees);

router.get('/:id', getEmployeeByID);

router.post('/', createEmployee);

router.patch('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);

router.post('/register', registerEmployee);

export default router; // export the router