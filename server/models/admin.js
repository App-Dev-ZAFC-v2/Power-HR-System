import mongoose from "mongoose";
// import userSchema from "./user.js";

const adminSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    name: String,

    notification: [{
        subject: String,
        message: String,
        link: {type: String, default: ""},
        read: {type: Boolean, default: false},
        date: {type: Date, default: Date.now},
    }],
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;