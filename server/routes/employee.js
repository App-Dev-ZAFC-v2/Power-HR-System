import express from 'express'; // import express

import { getEmployees, createEmployee, getEmployeeByID} from '../controllers/employee.js'; // import the getEmployees and createEmployee functions from the employee controller

const router = express.Router(); // create a router

router.get('/getAll', getEmployees);

router.get('/:id', getEmployeeByID);

router.post('/createOne', createEmployee);

export default router; // export the router