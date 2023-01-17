import Employee from '../models/employee.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { registerUser } from './user.js';

export const getEmployees = async (req, res) => {
    try{
        // find all employees where the inavtive field is not true
        const employees = await Employee.find({ inactive: false });
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
        // const user = await User.findById(employee.user);
        // //combine the two objects
        // const employeeObject = {
        //     ...employee._doc,
        //     username: user.username,
        // }
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
    //check if email is already in use
    const existingEmployee = await Employee.findOne({ email: employee.email });
    if(existingEmployee && existingEmployee._id != id) return res.status(409).json({ message: 'Email already in use' });
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, { new: true });
    res.json(updatedEmployee);
}

// delete request to delete an employee
export const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    //get the user value from the employee
    const employee = await Employee.findById(id);
    const user = employee.user;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employee with id: ${id}`);
    await Employee.findByIdAndRemove(id);
    //delete the user
    await User.findByIdAndRemove(user);
    res.json({ message: "Employee deleted successfully." });
}

//signup for employee
export const registerEmployee = async (req, res) => {
    const { username, password, name, email, contact, position, executiveRole} = req.body;
    try{
        const employee = await Employee.findOne({ email });
        if(employee) return res.status(400).json({ message: "Email already exists" });
        const newUser = await registerUser(username, password, password, 2, res, executiveRole);
        if (newUser == null) {
            return;
        }
        const result = await Employee.create({ user: newUser._id, name, email, contact, position, executiveRole });
        res.status(200).json({ result });
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong in registering employee", error });
    }
}

//remove employee by setting inactive to true and set inactive date to today
export const removeEmployee = async (req, res) => {
    const { id } = req.params;
    try{
        const employee = await Employee.findById(id);
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employee with id: ${id}`);
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { inactive: true, inactiveDate: Date.now() }, { new: true });
        res.json(updatedEmployee);
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong in removing employee", error });
    }
}

//reactivate employee by setting inactive to false and set inactive date to null
export const reactivateEmployee = async (req, res) => {
    const { id } = req.params;
    try{
        const employee = await Employee.findById(id);
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employee with id: ${id}`);
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { inactive: false, inactiveDate: null }, { new: true });
        res.json(updatedEmployee);
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong in removing employee", error });
    }
}