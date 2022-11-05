import Admin from '../models/admin.js';

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
        const admin = await Admin.findOne({ email, username, password });
        res.status(200).json(admin);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}