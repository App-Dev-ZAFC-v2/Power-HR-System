import mongoose from "mongoose";
import FormModel from "../models/form.js";

//Manage Form

export const getForms = async (req, res) => {
  try {
    const form = await FormModel.find().lean();
    res.status(200).json(form);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFormByID = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await FormModel.findById(id);
    res.status(200).json(form);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFormsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await FormModel.find({ createdBy: id });
    res.status(200).json(form);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFormsByCollaborator = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await FormModel.find({ collaborator: id });
    res.status(200).json(form);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFormsByPublished = async (req, res) => {
  try {
    const form = await FormModel.find({ published: true });
    res.status(200).json(form);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createForm = async (req, res) => {
  try {
    const data = {
      createdBy: req.body.createdBy,
      collaborator: req.body.createdBy,
      name: req.body.name,
      description: req.body.description,
      questions: req.body.questions,
      once: req.body.once,
    };

    const newForm = new FormModel(data);
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteForm = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Form with id: ${id}`);

  await FormModel.findByIdAndRemove(id);
  res.json({ message: "Form deleted successfully." });
};

export const updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      createdBy: req.body.createdBy,
      collaborator: req.body.createdBy,
      name: req.body.name,
      description: req.body.description,
      questions: req.body.questions,
      once: req.body.once,
      published: req.body.published,
      dueDate: req.body.dueDate,
      requiredAll: req.body.requiredAll,
    };

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No form with id: ${id}`);
    const updatedForm = await FormModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(updatedForm);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//Manage Feedback
