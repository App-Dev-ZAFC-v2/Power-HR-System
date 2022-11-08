import mongoose from "mongoose";
// import userSchema from "./user.js";

const adminSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;