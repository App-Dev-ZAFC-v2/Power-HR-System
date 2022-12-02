import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    jobName: String,
    jobDescription: String,
    quota: Number,
    dateStart: {
        type: Date,
        default: new Date()
    },
    dateEnd: Date,
    jobStatus: {
        type: String,
        default: "Open"
    },
    criteria: {
        type: String,
        default: "None"
    },
    qualification: String,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;