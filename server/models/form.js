import mongoose from "mongoose";

const formSchema = mongoose.Schema({

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },

    name: String,

    description:{type: String, default: "No description"},

    questions: [{
        questionText: String,
        questionType: String,
        questionImage: {type: String, default: ""},
        required: {type: Boolean, default: false},
        options: [{
            optionText: String,
            optionImage: {type: String, default: ""},
            optionScale: {type: Number, default: 0},
        }],
        openView: {type: Boolean, default: false},
    }],

    once:{
        type: Boolean,
        default: false,
    }
});

const Form = mongoose.model("Form", formSchema);

export default Form;