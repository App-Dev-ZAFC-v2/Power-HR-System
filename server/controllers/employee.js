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

//login for employee
export const loginEmployee = async (req, res) => {
    const {username, password } = req.body;
    try{
        const employee = await Employee.findOne({ email, username, password });
        res.status(200).json(employee);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}