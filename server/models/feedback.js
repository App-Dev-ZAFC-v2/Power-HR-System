import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
  formID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "form",
  },

  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
  },

  response: [
    {
      questionID: String,
      answer: [
        {
          text: String,
          optionID: String,
        },
      ],
    },
  ],

  draft: { type: Boolean, default: true },

  date: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
