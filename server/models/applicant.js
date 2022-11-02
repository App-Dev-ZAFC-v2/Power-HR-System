import mongoose from "mongoose";
import User from "./auth";

const applicantSchema = mongoose.Schema({
    user: User,
    applicantName: String,
    applicantEmail: String,
    applicantContact: String,
    applicantStatus: String
});

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;