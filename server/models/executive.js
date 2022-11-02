import mongoose from "mongoose";
import User from "./user";

const executiveSchema = mongoose.Schema({
    user: User,
    executiveName: String,
});

const Executive = mongoose.model("Executive", executiveSchema);

export default Executive;