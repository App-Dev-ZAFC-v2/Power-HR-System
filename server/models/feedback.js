import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    createdByID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },

    createdByName: String,
    feedbackTitle: String,
    feedbackMessage: String,

});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;