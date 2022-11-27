import mongoose from "mongoose";
// import userSchema from "./user.js";

const applicantSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    applicantStatus:{
        type: String,
        default: "Active" // Accepted, Rejected, Active, Inactive, Pending
    },
    name: String,
    email: String,
    contact: String,
     
});

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;