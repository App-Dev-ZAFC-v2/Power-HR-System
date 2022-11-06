import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
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