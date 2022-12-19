import Application from "../models/application.js";
import Job from "../models/job.js";
import Applicant from "../models/applicant.js";
import mongoose from "mongoose";

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getApplicationByID = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findById(id);
    res.status(200).json(application);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get application for a specific applicant
export const getApplicationByApplicantID = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.find({ applicant: id });
    // get all the job ids
    const jobIDs = application.map((app) => app.job);
    // now that we have the array of job ids,
    // we can use the job id to get the job object
    const jobs = await Job.find({ _id: { $in: jobIDs } });
    // combine the job object with the application object
    const combined = application.map((app) => {
      const job = jobs.find((job) => job._id.toString() === app.job.toString());
      return { ...app._doc, job };
    });
    res.status(200).json(combined);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get application for a specific job
export const getApplicationByJobID = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.find({ job: id });
    // get all the job ids
    const applicantIDs = application.map((app) => app.job);
    // now that we have the array of applicant ids,
    // we can use the applicant id to get the applicant object
    const applicants = await Applicant.find({ _id: { $in: applicantIDs } });
    // combine the applicant object with the application object
    const combined = application.map((app) => {
      const applicant = applicants.find(
        (applicant) => applicant._id.toString() === app.applicant.toString()
      );
      return { ...app._doc, applicant };
    });
    res.status(200).json(combined);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get all applications for a specific job or applicant
export const getApplicationsByAttrID = async (req, res) => {
  const { attr, id } = req.params;
  // attr is either job or applicant
  try {
    if (attr === "job") {
      const applications = await Application.find({ job: id });
      res.status(200).json(applications);
    } else if (attr === "applicant") {
      const applications = await Application.find({ applicant: id });
      res.status(200).json(applications);
    } else {
      res.status(404).json({ message: "Invalid attribute" });
    }
    // const applications = await Application.find({ [attr]: id });
    // res.status(200).json(applications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get all applications for a specific applicant and only return the job id
export const getApplicantAppliedJob = async (req, res) => {
  const { id } = req.params;
  try {
    const applications = await Application.find({ applicant: id });
    const appliedJobs = applications.map((application) => application.job);
    res.status(200).json(appliedJobs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// post request to create a new application using the job id and applicant id
export const createApplicationByIDs = async (req, res) => {
  const { applicantID, jobID } = req.params;
  const application = { job: jobID, applicant: applicantID };
  const newApplication = new Application(application);
  try {
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// post request to create a new application
export const createApplication = async (req, res) => {
  const application = req.body;
  const newApplication = new Application(application);
  try {
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// patch request to update an application
export const updateApplication = async (req, res) => {
  const { id } = req.params;
  const application = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No application with id: ${id}`);
  const updatedApplication = await Application.findByIdAndUpdate(
    id,
    application,
    { new: true }
  );
  res.json(updatedApplication);
};

// delete request to delete an application
export const deleteApplication = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No application with id: ${id}`);
  await Application.findByIdAndRemove(id);
  res.json({ message: "Application deleted successfully." });
};

//get requests
export const getApplicationsPagination = async (req, res) => {
  try {
    const page = req.query.page;
    // const limit = req.query.limit;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const count = await Application.countDocuments();
    const results = {};
    if (endIndex < count) {
      results.next = {
        // return the next page number
        page: page * 1 + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    if (endIndex > count) {
      results.end = count;
    } else {
      results.end = endIndex;
    }
    results.count = count;
    results.maxPage = Math.ceil(count / limit);
    results.start = startIndex + 1;
    results.results = await Application.find()
      .limit(limit * 1)
      .skip(startIndex)
      .exec();
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
