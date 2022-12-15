import express from 'express'; // import express
import {getApplications, getApplicationByID, getApplicationsByAttrID, createApplication, updateApplication, deleteApplication, getApplicantAppliedJob, createApplicationByIDs} from '../controllers/application.js'; // import the functions from the controller

const router = express.Router(); // create a router

router.get('/', getApplications);

router.get('/view/:id', getApplicationByID);

// router.get('/:attr/:id', getApplicationsByAttrID);

router.get('/appliedby/:id', getApplicantAppliedJob);

router.post('/', createApplication);

router.post('/:applicantID/apply/:jobID', createApplicationByIDs);

router.patch('/:id', updateApplication);

router.delete('/:id', deleteApplication);

export default router; // export the router