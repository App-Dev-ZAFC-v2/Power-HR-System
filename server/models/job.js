import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    jobName: String,
    jobDescription: String,
    qualification: String,
    cgpa: Number,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;