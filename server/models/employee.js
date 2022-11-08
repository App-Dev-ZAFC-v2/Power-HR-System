import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    employeeName: String,
    employeeEmail: String,
    employeeContact: String,
    employeePosition: String,
    // employeeRole differentiate between executive and employee
    executiveRole: Boolean,
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;