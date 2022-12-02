import mongoose from "mongoose";
import FormModel from "../models/form";

//Manage Form

export const getForm = async (req, res) =>{
    try {
        const form = await FormModel.find().lean();
        res.status(200).json(form);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getFormByID = async (req, res) =>{
    try{
        const { id } = req.params;
        const form = await FormModel.findById(id);
        res.status(200).json(form);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createForm = async (req, res) => {
    try{
        const data = {
            createdBy : req.body.createdBy,
            name: req.body.name,
            description: req.body.description
        }

        const newForm = new FormModel(data);
        await newForm.save();
        res.status(201).json(newForm);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const deleteForm = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No Form with id: ${id}`);

    await FormModel.findByIdAndRemove(id);
    res.json({ message: "Form deleted successfully." });
}

export const updateForm = async (req, res) => {
    try {
        const {id } = req.params;
        const data = {
            name: req.body.name,
            description: req.body.description,
            questions: req.body.questions
        } 

        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send(`No form with id: ${id}`);
        const updatedForm = await FormModel.findByIdAndUpdate(id, data, { new: true });
        res.json(updatedForm);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//Manage Feedback