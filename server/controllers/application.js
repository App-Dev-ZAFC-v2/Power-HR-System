import Application from "../models/application.js";
import mongoose from "mongoose";

export const getApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }

export const getApplicationByID = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findById(id);
        res.status(200).json(application);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }

//get all applications for a specific job or applicant
export const getApplicationsByAttrID = async (req, res) => {
    const { attr, id } = req.params;
    // attr is either job or applicant
    try {
        if (attr === "job") {
            const applications = await Application.find({ job: id });
            res.status(200).json(applications);
        } else if (attr === "applicant") {
            const applications = await Application.find({ applicant: id });
            res.status(200).json(applications);
        } else {
            res.status(404).json({ message: "Invalid attribute" });
        }
        // const applications = await Application.find({ [attr]: id });
        // res.status(200).json(applications);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }

// post request to create a new application
export const createApplication = async (req, res) => {
    const application = req.body;
    const newApplication = new Application(application);
    try {
        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    }

// patch request to update an application
export const updateApplication = async (req, res) => {
    const { id } = req.params;
    const application = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No application with id: ${id}`);
    const updatedApplication = await Application.findByIdAndUpdate(id, application, { new: true });
    res.json(updatedApplication);
    }

// delete request to delete an application
export const deleteApplication = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No application with id: ${id}`);
    await Application.findByIdAndRemove(id);
    res.json({ message: "Application deleted successfully." });
    }