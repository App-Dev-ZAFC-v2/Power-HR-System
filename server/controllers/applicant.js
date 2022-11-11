import Applicant from '../models/applicant.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const getApplicants = async (req, res) => {
    try{
        const applicants = await Applicant.find();
        res.status(200).json(applicants);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const getApplicantByID = async (req, res) => {
    const { id } = req.params;
    try{
        const applicant = await Applicant.findById(id);
        res.status(200).json(applicant);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

// post request to create a new applicant
export const createApplicant = async (req, res) => {
    const applicant = req.body;
    const newApplicant = new Applicant(applicant);
    try{
        await newApplicant.save();
        res.status(201).json(newApplicant);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

// patch request to update an applicant
export const updateApplicant = async (req, res) => {
    const { id } = req.params;
    const applicant = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No applicant with id: ${id}`);
    const updatedApplicant = await Applicant.findByIdAndUpdate(id, applicant, { new: true });
    res.json(updatedApplicant);
}

// delete request to delete an applicant
export const deleteApplicant = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No applicant with id: ${id}`);
    await Applicant.findByIdAndRemove(id);
    res.json({ message: "Applicant deleted successfully." });
}

//login for applicant
// export const loginApplicant = async (req, res) => {
//     const { username, password } = req.body;
//     try{
//         const applicant = await Applicant.findOne({ username });
//         if(!applicant) return res.status(404).json({ message: "Applicant doesn't exist" });
//         const isPasswordCorrect = await bcrypt.compare(password, applicant.password);
//         if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
//         const token = jwt.sign({ username: applicant.username, id: applicant._id }, 'test', { expiresIn: "1h" });
//         res.status(200).json({ result: applicant, token });
//     }
//     catch(error){
//         res.status(500).json({ message: "Something went wrong" });
//     }
// }

//register for applicant
export const registerApplicant = async (req, res) => {
    const { username, password, confirmPassword, name, email, contact} = req.body;
    try{
        const applicant = await Applicant.findOne({ email });
        if(applicant) return res.status(400).json({ message: "Email already exists" });
        const user = await User.findOne({ username });
        if(user) return res.status(400).json({ message: "Username already exists" });
        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ username, password: hashedPassword, userType: 0 });
        await newUser.save();
        const result = await Applicant.create({ user: newUser._id, name, email, contact });
        // const token = jwt.sign({ username: result.username, id: result._id }, { expiresIn: "1h" });
        res.status(200).json({ result });
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}