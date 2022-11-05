import mongoose from "mongoose";
// import User from "./user.js";
import userSchema from "./user.js";

const employeeSchema = mongoose.Schema({
    user: {
        type: userSchema,
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