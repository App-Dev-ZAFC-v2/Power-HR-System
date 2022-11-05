import mongoose from "mongoose";
import userSchema from "./user";

const adminSchema = mongoose.Schema({
    user: userSchema,
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;