import mongoose from "mongoose";
// import userSchema from "./user.js";

const adminSchema = mongoose.Schema({
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

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;