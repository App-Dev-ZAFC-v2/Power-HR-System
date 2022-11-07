import express from 'express'; // import express

import { getApplicants, createApplicant, getApplicantByID, updateApplicant, deleteApplicant, registerApplicant} from '../controllers/applicant.js'; // import the getApplicants and createApplicant functions from the applicant controller

const router = express.Router(); // create a router

router.get('/', getApplicants);

router.get('/:id', getApplicantByID);

router.post('/', createApplicant);

router.patch('/:id', updateApplicant);

router.delete('/:id', deleteApplicant);

router.post('/register', registerApplicant);

export default router; // export the router