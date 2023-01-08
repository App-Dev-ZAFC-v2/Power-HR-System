import express from 'express'; // import express

import {AuthAdmin} from '../middleware/Auth.js'; // import the auth middleware

import {getJobs, getJobsSearchPaginate, getJobByID, getJobsCount, getAllJobs, createJob, updateJob, deleteJob} from '../controllers/job.js'; // import the functions from the controller

const router = express.Router(); // create a router

router.get('/all', AuthAdmin, getAllJobs);

router.get('/view/:id', getJobByID);

router.get('/count', getJobsCount);

// router.get('/', getJobs);

router.get('/', getJobs);

router.post('/', createJob);

router.patch('/:id', updateJob);

router.delete('/:id', deleteJob);

export default router; // export the router
