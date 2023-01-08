import express from 'express'; // import express
// import authenicate middleware
import { AuthToken, AuthAdmin, AuthExecutive, AuthAdminOrExecutive } from '../middleware/Auth.js';

import { getEmployees, createEmployee, getEmployeeByID, updateEmployee, deleteEmployee, registerEmployee, removeEmployee, reactivateEmployee} from '../controllers/employee.js'; // import the getEmployees and createEmployee functions from the employee controller

const router = express.Router(); // create a router

//router.get('/', AuthExecutive,  getEmployees); //find this culprit

router.get('/', AuthAdminOrExecutive, getEmployees);

router.get('/:id', AuthAdmin, getEmployeeByID);

router.get('/f/:id', getEmployeeByID);

router.post('/', AuthAdmin, createEmployee);

router.patch('/:id',AuthAdmin, updateEmployee);

router.delete('/:id', AuthAdmin, deleteEmployee);

router.post('/register', AuthAdmin, registerEmployee);

router.patch('/remove/:id', AuthAdmin, removeEmployee);

router.patch('/reactivate/:id', AuthAdmin, reactivateEmployee);

export default router; // export the router