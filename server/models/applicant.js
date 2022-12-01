import mongoose from "mongoose";
// import userSchema from "./user.js";

const applicantSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: String,
    email: String,
    contact: String,
    qualification: String,
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
    }],
     
});

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;