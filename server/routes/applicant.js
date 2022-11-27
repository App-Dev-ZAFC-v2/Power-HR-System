import express from 'express'; // import express

import { AuthToken, AuthAdmin, AuthApplicant } from '../middleware/Auth.js';

import { getApplicants, createApplicant, getApplicantByID, updateApplicant, deleteApplicant, registerApplicant} from '../controllers/applicant.js'; // import the getApplicants and createApplicant functions from the applicant controller

const router = express.Router(); // create a router

router.get('/', AuthAdmin, getApplicants);

router.get('/:id', getApplicantByID);

// router.post('/', createApplicant);

router.put('/:id', AuthApplicant, updateApplicant);

router.delete('/:id', AuthAdmin, deleteApplicant);

router.post('/register', registerApplicant);

export default router; // export the router