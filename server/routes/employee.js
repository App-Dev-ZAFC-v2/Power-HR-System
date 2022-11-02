import express from 'express'; // import express

import { getEmployees, createEmployee} from '../controller/employee.js'; // import the getEmployees and createEmployee functions from the employee controller

const router = express.Router(); // create a router

router.get('/getAll', getEmployees);

router.get('/:id', getEmployees);

router.post('/createOne', createEmployee);

export default router; // export the router