import Employee from '../models/employee.js';

export const getEmployees = async (req, res) => {
    try{
        const employees = await Employee.find();
        res.status(200).json(employees);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const getEmployeeName = async (req, res) => {
    const { id } = req.params;
    try{
        const employee = await Employee.findById(id);
        res.status(200).json(employee);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const createEmployee = (req, res) => {
    const employee = req.body;
    const newEmployee = new Employee(employee);
    try{
        newEmployee.save();
        res.status(201).json(newEmployee);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}