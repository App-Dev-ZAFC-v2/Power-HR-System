import express from 'express'; // import express

import { getAdmins, createAdmin, getAdminByID, updateAdmin, deleteAdmin, loginAdmin} from '../controllers/admin.js'; // import the getAdmins and createAdmin functions from the admin controller

const router = express.Router(); // create a router

router.get('/', getAdmins);

router.get('/:id', getAdminByID);

router.post('/', createAdmin);

router.patch('/:id', updateAdmin);

router.delete('/:id', deleteAdmin);

router.post('/login', loginAdmin);

export default router; // export the router