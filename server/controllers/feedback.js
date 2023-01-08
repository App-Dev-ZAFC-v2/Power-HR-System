import Feedback from "../models/feedback.js";
import mongoose from "mongoose";
import Employee from "../models/employee.js";

export const getFeedbacks = async (req, res) => {
    try{
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const getFeedbackByID = async (req, res) => {
    const { id } = req.params;
    try{
        const feedback = await Feedback.findById(id);
        res.status(200).json(feedback);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

// post request to create a new feedback
export const createFeedback = async (req, res) => {
    const feedback = req.body;
    const newFeedback = new Feedback(feedback);
    try{
        await newFeedback.save();
        res.status(201).json(newFeedback);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

// patch request to update a feedback
export const updateFeedback = async (req, res) => {
    const { id } = req.params;
    const feedback = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No feedback with id: ${id}`);
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, feedback
        , { new: true });
    res.json(updatedFeedback);
}

// delete request to delete a feedback
export const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No feedback with id: ${id}`);
    await Feedback.findByIdAndRemove(id);
    res.json({ message: "Feedback deleted successfully." });
}

//view feedback list that has been answered by employees
export const getEmployeeWithFeedback = async (req, res) => {
    try {

      //select all feedbacks
      const feedbacks = await Feedback.find().lean();
  
      //select all employees that have feedbacks
      const employeeIDs = feedbacks.map((feedback) => feedback.employee);
  
      //select all employees
      const employees = await Employee.find({ _id: { $in: employeeIDs } }).select({
          name: 1,
          email: 1,
          contact: 1,
          position: 1,
      });
  
      //combine employees and feedbacks
      const combined = employees.map((employee) => {
          //find feedbacks that belong to the employee
          const employeeFeedbacks = feedbacks.filter(
              (feedback) => feedback.employee.toString() == employee._id.toString()
          );
  
          return {...employee._doc, feedbacks: employeeFeedbacks};
      });
      res.status(200).json(combined);
  
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

