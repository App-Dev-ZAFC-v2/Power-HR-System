import Employee from '../models/employee.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { registerUser } from './user.js';

export const getEmployees = async (req, res) => {
    try{
        const employees = await Employee.find();
        res.status(200).json(employees);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const getEmployeeByID = async (req, res) => {
    const { id } = req.params;
    try{
        const employee = await Employee.findById(id);
        res.status(200).json(employee);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

// post request to create a new employee
export const createEmployee = async (req, res) => {
    const employee = req.body;
    const newEmployee = new Employee(employee);
    try{
        await newEmployee.save();
        res.status(201).json(newEmployee);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

// patch request to update an employee
export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const employee = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employee with id: ${id}`);
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, { new: true });
    res.json(updatedEmployee);
}

// delete request to delete an employee
export const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employee with id: ${id}`);
    await Employee.findByIdAndRemove(id);
    res.json({ message: "Employee deleted successfully." });
}

//signup for employee
export const registerEmployee = async (req, res) => {
    const { username, password, confirmPassword, name, email, contact, position, executiveRole} = req.body;
    try{
        const employee = await Employee.findOne({ email });
        if(employee) return res.status(400).json({ message: "Email already exists" });
        console.log("executiveRole: " + executiveRole);
        const newUser = await registerUser(username, password, password, 2, res, executiveRole);
        console.log("newUser: " + newUser);
        if (newUser == null) {
            return;
        }
        const result = await Employee.create({ user: newUser._id, name, email, contact, position, executiveRole });
        res.status(200).json({ result });
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}