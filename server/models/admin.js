import mongoose from "mongoose";
import User from "./user";

const adminSchema = mongoose.Schema({
    user: User,
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;