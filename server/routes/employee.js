import express from 'express'; // import express
// import authenicate middleware
import { AuthToken, AuthAdmin, AuthExecutive } from '../middleware/Auth.js';

import { getEmployees, createEmployee, getEmployeeByID, updateEmployee, deleteEmployee, registerEmployee} from '../controllers/employee.js'; // import the getEmployees and createEmployee functions from the employee controller

const router = express.Router(); // create a router

router.get('/', AuthExecutive,  getEmployees);

router.get('/', AuthAdmin, getEmployees);

router.get('/:id', AuthAdmin, getEmployeeByID);

router.post('/', AuthAdmin, createEmployee);

router.patch('/:id',AuthAdmin, updateEmployee);

router.delete('/:id', AuthAdmin, deleteEmployee);

router.post('/register', AuthAdmin, registerEmployee);

export default router; // export the router