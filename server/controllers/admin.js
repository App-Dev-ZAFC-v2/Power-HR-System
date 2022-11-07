import Admin from '../models/admin.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAdmins = async (req, res) => {
    try{
        const admins = await Admin.find();
        res.status(200).json(admins);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const getAdminByID = async (req, res) => {
    const { id } = req.params;
    try{
        const admin = await Admin.findById(id);
        res.status(200).json(admin);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

// post request to create a new admin
export const createAdmin = async (req, res) => {
    const admin = req.body;
    const newAdmin = new Admin(admin);
    try{
        await newAdmin.save();
        res.status(201).json(newAdmin);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

// patch request to update an admin
export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const admin = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No admin with id: ${id}`);
    const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, { new: true });
    res.json(updatedAdmin);
}

// delete request to delete an admin
export const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No admin with id: ${id}`);
    await Admin.findByIdAndRemove(id);
    res.json({ message: "Admin deleted successfully." });
}

//login for admin
export const loginAdmin = async (req, res) => {
    const {username, password } = req.body;
    try{
        const admin = await Admin.findOne({ username });
        if(!admin) return res.status(404).send("Admin doesn't exist");
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if(!isPasswordCorrect) return res.status(400).send("Invalid credentials");
        const token = jwt.sign({ username: admin.username, id: admin._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result: admin, token });
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}

//register for admin
export const registerAdmin = async (req, res) => {
    const { username, password } = req.body;
    try{
        const admin = await Admin.findOne({ username });
        if(admin) return res.status(400).send("Admin already exists");
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await Admin.create({ username, password: hashedPassword });
        // const token = jwt.sign({ username: result.username, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result });
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}