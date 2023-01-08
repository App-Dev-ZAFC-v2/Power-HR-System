import express from "express"; // import express

import { AuthToken, AuthAdmin, AuthApplicant } from "../middleware/Auth.js";
import {
  getUserByID,
  changePassword,
  getUsernameByID,
  changeUsername,
} from "../controllers/user.js"; // import the getUsers and createUser functions from the user controller

const router = express.Router(); // create a router

// router.get('/', AuthAdmin, getUsers);\

router.put("/updateusername/:id", changeUsername);

router.get("/username/:id", getUsernameByID);

router.get("/a/:id", AuthAdmin, getUserByID);

// router.get("/user", AuthToken, getUserByID);

router.post("/changepassword", AuthApplicant, changePassword);

export default router; // export the router
