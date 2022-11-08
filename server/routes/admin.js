import express from 'express'; // import express

import { AuthToken, AuthAdmin } from '../middleware/Auth.js';

import { getAdmins, createAdmin, getAdminByID, updateAdmin, deleteAdmin, registerAdmin} from '../controllers/admin.js'; // import the getAdmins and createAdmin functions from the admin controller

const router = express.Router(); // create a router

router.get('/', AuthAdmin, getAdmins);

router.get('/:id', AuthAdmin, getAdminByID);

router.post('/', AuthAdmin, createAdmin);

router.patch('/:id', AuthAdmin, updateAdmin);

router.delete('/:id', AuthAdmin, deleteAdmin);

router.post('/register', AuthAdmin, registerAdmin);

export default router; // export the router