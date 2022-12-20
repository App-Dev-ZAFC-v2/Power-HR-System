import express from "express"; // import express
import {
  getApplicationByApplicantID,
  getApplications,
  getApplicationByID,
  getApplicationByJobID,
  getApplicationsByAttrID,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplicantAppliedJob,
  createApplicationByIDs,
  getApplicationsWithPagination,
  getJobsWithApplications,
} from "../controllers/application.js"; // import the functions from the controller

const router = express.Router(); // create a router

// router.get("/", getApplications);

router.get("/view/:id", getApplicationByID);

router.get("/byapplicant/:id", getApplicationByApplicantID);

router.get("/byjob/:jobid", getApplicationByJobID);

// router.get('/:attr/:id', getApplicationsByAttrID);

router.get("/appliedby/:id", getApplicantAppliedJob);

router.post("/", createApplication);

router.post("/:applicantID/apply/:jobID", createApplicationByIDs);

router.patch("/:id", updateApplication);

router.delete("/:id", deleteApplication);

router.get("/results", getApplicationsWithPagination)

router.get("/jobs", getJobsWithApplications)

export default router; // export the router
