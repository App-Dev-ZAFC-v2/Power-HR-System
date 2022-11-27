import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: Number,
        required: true,
        validate (value) {
            if (value < 0 || value > 3) {
                throw new Error("User type must be 0, 1, 2 or 3");
                //0-Applicant 1-admin 2-employee
            }
        },
    },
});

const User = mongoose.model("User", userSchema);

export default User;