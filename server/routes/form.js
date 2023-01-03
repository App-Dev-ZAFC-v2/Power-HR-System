import express from 'express';
import { createForm, deleteForm, getForms, getFormByID, updateForm, getFormsByUser, getFormsByCollaborator, getFormsByPublished } from '../controllers/form.js';

const router = express.Router();

router.get('/', getForms);
router.get('/:id', getFormByID);
router.get('/:userID/u', getFormsByUser);
router.get('/:userID/c', getFormsByCollaborator);
router.get('/published', getFormsByPublished);
router.post('/', createForm);
router.patch('/:id', updateForm);
router.delete('/:id', deleteForm);

export default router;