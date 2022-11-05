import mongoose from "mongoose";
import userSchema from "./user.js";

const applicantSchema = mongoose.Schema({
    user: userSchema,
    applicantName: String,
    applicantEmail: String,
    applicantContact: String,
    applicantStatus: String
});

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;