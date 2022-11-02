import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

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
});

// const User = mongoose.model("User", userSchema);

export default userSchema;