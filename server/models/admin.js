import mongoose from "mongoose";
import userSchema from "./user.js";

const adminSchema = mongoose.Schema({
    user: userSchema,
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;