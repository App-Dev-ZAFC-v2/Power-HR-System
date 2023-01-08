import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: String,
    email: String,
    contact: String,
    position: String,
    // employeeRole differentiate between executive and employee
    executiveRole: Boolean,
    inactive: {
        type: Boolean,
        default: false,
    },
    inactiveDate: {
        type: Date,
        default: null,
        // validate: {
        //     validator: function (v) {
        //         return !this.active;
        //     }
        // }
    },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;