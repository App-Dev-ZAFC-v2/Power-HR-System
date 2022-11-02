import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    feedbackTitle: String,
    feedbackMessage: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;