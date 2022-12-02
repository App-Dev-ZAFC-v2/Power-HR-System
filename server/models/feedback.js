import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    
    formID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'form'
    },

    employeeID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },

    response : [{
        questionID: String,
        answer: String
    }],
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;