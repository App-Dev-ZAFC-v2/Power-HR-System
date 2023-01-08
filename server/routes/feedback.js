import express from "express"; // import express

import {
  getFeedbacks,
  getFeedbackByID,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackByEmployeeIDAndFormID,
  getFeedbackByEmployeeID,
  deleteFeedbackByFormID,
} from "../controllers/feedback.js"; // import the functions from the controller

const router = express.Router(); // create a router

router.get("/", getFeedbacks);

router.get("/form/:id", getFeedbackByID);

router.get("/employee/:employeeID", getFeedbackByEmployeeID); // get feedback by employee id and form id (formID is the id of the form

router.get("/:formID/:employeeID", getFeedbackByEmployeeIDAndFormID);

router.post("/", createFeedback);

router.patch("/:id", updateFeedback);

router.delete("/:id", deleteFeedback);

router.delete("/form/:formID", deleteFeedbackByFormID);

// router.delete('/employee', getEmployeeWithFeedback);

export default router; // export the router
