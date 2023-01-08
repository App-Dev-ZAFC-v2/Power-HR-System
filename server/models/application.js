import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  applicationDate: {
    type: Date,
    default: new Date(),
  },
  applicationStatus: {
    type: String,
    default: "New", //New, Shortlisted, Rejected, Accepted
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Applicant",
  },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
