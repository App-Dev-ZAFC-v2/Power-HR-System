import express from 'express';
import { createForm, deleteForm, getForms, getFormByID, updateForm } from '../controllers/form.js';

const router = express.Router();

router.get('/', getForms);
router.get('/:id', getFormByID);
router.post('/', createForm);
router.patch('/:id', updateForm);
router.delete('/:id', deleteForm);

export default router;