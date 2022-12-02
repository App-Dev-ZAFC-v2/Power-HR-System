import express from 'express'; // import express
import {getApplications, getApplicationByID, getApplicationsByAttrID, createApplication, updateApplication, deleteApplication} from '../controllers/application.js'; // import the functions from the controller

const router = express.Router(); // create a router

router.get('/', getApplications);

router.get('/:id', getApplicationByID);

router.get('/:attr/:id', getApplicationsByAttrID);

router.post('/', createApplication);

router.patch('/:id', updateApplication);

router.delete('/:id', deleteApplication);

export default router; // export the router