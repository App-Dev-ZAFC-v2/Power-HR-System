import Employee from '../models/employee.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

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
    const { username, password, confirmPassword, employeeName, employeeEmail, employeeContact, employeePosition} = req.body;
    try{
        const employee = await Employee.findOne({ employeeEmail });
        if(employee) return res.status(400).json({ message: "Email already exists" });
        const user = await Employee.findOne({ username });
        if(user) return res.status(400).json({ message: "Username already exists" });
        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await Employee.create({ username, password: hashedPassword, employeeName, employeeEmail, employeeContact, employeePosition });
        // const token = jwt.sign({ username: result.username, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result });
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}

//login for employee
export const loginEmployee = async (req, res) => {
    const { username, password } = req.body;
    try{
        const employee = await Employee.findOne({ username });
        if(!employee) return res.status(404).json({ message: "Employee doesn't exist" });
        const isPasswordCorrect = await bcrypt.compare(password, employee.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ user: employee.username, id: employee._id }, process.env.JWT_SECRET);
        console.log(employee);
        res.status(200).json({ result: employee, token });
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}