import mongoose from "mongoose";

const criteriaSchema = mongoose.Schema({
    qualification: String,
    cgpa: Number,
});

const Criteria = mongoose.model("Criteria", criteriaSchema);

export default criteriaSchema;