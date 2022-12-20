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

// get all applications with pagination
export const getApplicationsWithPagination = async (req, res) => {
  // const { page, limit } = req.query;
  try {
    // const startIndex = (Number(page) - 1) * Number(limit);
    // const endIndex = Number(page) * Number(limit);
    const results = {};
    // if (endIndex < (await Application.countDocuments().exec())) {
    //   results.next = {
    //     page: Number(page) + 1,
    //     limit: Number(limit),
    //   };
    // }
    // if (startIndex > 0) {
    //   results.previous = {
    //     page: Number(page) - 1,
    //     limit: Number(limit),
    //   };
    // }
    results.results = await Application.find()
      // .limit(Number(limit))
      // .skip(startIndex)
      .exec();
    // get all the job ids
    const jobIDs = results.results.map((app) => app.job);
    // now that we have the array of job ids,
    // we can use the job id to get the job object with only name, level, and quota
    const jobs = await Job.find({ _id: { $in: jobIDs } }).select({
      name: 1,
      level: 1,
      quota: 1,
    });
    // get all the applicant ids
    const applicantIDs = results.results.map((app) => app.applicant);
    // now that we have the array of applicant ids,
    // we can use the applicant id to get the applicant object
    const applicants = await Applicant.find({ _id: { $in: applicantIDs } });

    // combine the job object with the application object
    const combined = results.results.map((app) => {
      const job = jobs.find(
        (job) => job._id.toString() === app.job.toString()
      );
      const applicant = applicants.find(
        (applicant) => applicant._id.toString() === app.applicant.toString()
      );
      return { ...app._doc, job, applicant };
    });
    results.results = combined;
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// get all jobs that have applications
export const getJobsWithApplications = async (req, res) => {
  try {
    const applications = await Application.find().select({
      applicationDate: 1,
      applicationStatus: 1,
      applicant: 1,
      job: 1,
    });

    const jobIDs = applications.map((app) => app.job);
    const jobs = await Job.find({ _id: { $in: jobIDs } }).select({
      name: 1,
      level: 1,
      quota: 1,
    });
    // get all the applicant that applied for the job
    const applicantIDs = applications.map((app) => app.applicant);
    const applicants = await Applicant.find({ _id: { $in: applicantIDs } });
    // attach the applications to the job
    const combined = jobs.map((job) => {
      const application = applications.filter(
        (app) => app.job.toString() === job._id.toString()
      );

      const applicant = applicants.filter(
        // loop through the applications and get the applicant id and compare it to the applicant id
        (applicant) =>
          application.find(
            (app) => app.applicant.toString() === applicant._id.toString()
          ) !== undefined);

      // combine the application object with the applicant object by using the applicant id
      const combinedApplicant = application.map((app) => {
        const applicant = applicants.find(
          (applicant) =>
            applicant._id.toString() === app.applicant.toString()
        );
        return { ...app._doc, applicant };
      });
      return { ...job._doc, application: combinedApplicant };

      // if want to return with the application object, use this
      // return { ...job._doc, application, applicant };
      // if want to return with only the applicants, use this
      // return { ...job._doc, applicant };
    });
    res.status(200).json(combined);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
