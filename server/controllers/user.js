import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const loginUser = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if(!user) return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const id = user._id;
        const userType = user.userType;
        userType === 0 ? model = "Applicant" : userType === 1 ? model = "Admin" : model = "Employee";
        const userObject = await mongoose.model(model).findOne({ userID: id });
        const userID = userObject._id;
        const token = jwt.sign({ id, userType, userID }, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ token });
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}