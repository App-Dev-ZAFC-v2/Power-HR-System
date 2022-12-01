import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    applicationDate : {
        type: Date,
        default: new Date()
    },
    applicationStatus: {
        type: String,
        default: "Pending"
    },
    job : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;