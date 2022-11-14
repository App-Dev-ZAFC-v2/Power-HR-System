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
        const UserId = user._id;
        const userType = user.userType;
        let model;
        userType === 0 ? model = "Applicant" : userType === 1 ? model = "Admin" : model = "Employee";
        const userObject = await mongoose.model(model).findOne({ userID: UserId });
        const detailId = userObject._id;
        //correct up until here
        const token = jwt.sign({ UserId, userType, detailId }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}

// export async function registerUser(username, password, confirmPassword, userType, res) {
//     try{
//         console.log("1");
//         const user = await User.findOne({ username });
//         console.log(user);
//         if(user) res.status(400).json({ message: "Username already exists" });
//         console.log("3");
//         if(password !== confirmPassword) res.status(400).json({ message: "Passwords don't match" });
//         console.log("4");
//         const hashedPassword = bcrypt.hash(password, 12);
//         console.log("5");
//         const newUser = new User({ username, password: hashedPassword, userType });
//         console.log("6");
//         newUser.save();
//         console.log("7");
//         return newUser;
//     }
//     catch(error){
//         res.status(500).json({ message: "Something went wrong" });
//     }
// }

export const registerUser = async (username, rawpassword, confirmPassword, userType, res) => {
    // const { username, password, confirmPassword, userType } = req.body;
    try{
        const user = await User.findOne({ username });
        if(user){
            res.status(400).json({ message: "Username already exists" });
            return;
        }
        if(rawpassword !== confirmPassword){
            res.status(400).json({ message: "Passwords don't match" });
            return;
        }
        const hashedPassword = await bcrypt.hash(rawpassword, 12);
        const newUser = new User({ username, password: hashedPassword, userType });
        await newUser.save();
        return newUser;
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}
