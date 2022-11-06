import mongoose from "mongoose";
// import userSchema from "./user.js";

const applicantSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    applicantName: String,
    applicantEmail: String,
    applicantContact: String,
    applicantStatus: String
});

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;