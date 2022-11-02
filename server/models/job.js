import mongoose from "mongoose";
import Criteria from "./criteria";

const jobSchema = mongoose.Schema({
    jobName: String,
    jobDescription: String,
    criteria: Criteria,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;