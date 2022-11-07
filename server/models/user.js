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
            if (value < 0 || value > 2) {
                throw new Error("User type must be 0, 1, or 2");
            }
        },
    },
});

const User = mongoose.model("User", userSchema);

export default User;