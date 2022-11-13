import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
    feedbackTitle: String,
    feedbackMessage: String,

});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;