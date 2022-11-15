import express from 'express'; // import express

import {getJobs, getJobByID, createJob, updateJob, deleteJob} from '../controllers/job.js'; // import the functions from the controller

const router = express.Router(); // create a router

router.get('/', getJobs);

router.get('/:id', getJobByID);

router.post('/', createJob);

router.patch('/:id', updateJob);

router.delete('/:id', deleteJob);

export default router; // export the router
