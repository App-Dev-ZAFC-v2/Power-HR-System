import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    jobName: String,
    jobDescription: String,
    quota: Number,
    dateStart: Date,
    dateEnd: Date,
    
});

const Job = mongoose.model("Job", jobSchema);

export default Job;