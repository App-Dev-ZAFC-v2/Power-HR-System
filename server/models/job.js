import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    scope:{
        type: [String]
    },
    requirements: {
        type: [String],
    },
    level: {
        type: String,
        enum: ["Internship","Entry", "Mid", "Senior"]
    },
    salary: {
        min: Number,
        max: Number
    },
    location: String,
    specializations: {
        type: String,
        enum: ["Not Specified","Accounting/Finance", 
        "Admin/HR", "Sales/Marketing", 
        "Arts/Media/Communications", "Services", 
        "Education/Training", "Tech Support/IT",
        "Software Development", "Engineering",
        "Healthcare", "Legal", "Manufacturing",
        "Science", "Other"],
        default: "Not Specified"
    },
    quota: Number,
    dateStart: {
        type: Date,
        default: new Date()
    },
    dateEnd: Date,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;