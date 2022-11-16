import mongoose from "mongoose";
import criteriaSchema from "./criteria.js";

const jobSchema = mongoose.Schema({
    jobName: String,
    jobDescription: String,
    criteria: criteriaSchema,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;