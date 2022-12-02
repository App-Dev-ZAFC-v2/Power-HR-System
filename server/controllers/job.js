import Job from '../models/job.js';
import mongoose from 'mongoose';

export const getJobs = async (req, res) => {
    try{
        const jobs = await Job.find();
        res.status(200).json(jobs);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const getJobByID = async (req, res) => {
    const { id } = req.params;
    try{
        const job = await Job.findById(id);
        res.status(200).json(job);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

// post request to create a new job
export const createJob = async (req, res) => {
    const job = req.body;
    const newJob = new Job(job);
    try{
        if(newJob.dateEnd < newJob.dateStart){
            res.status(409).json({ message: "End date cannot be before start date" });
        }
        await newJob.save();
        res.status(201).json(newJob);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

// patch request to update a job
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const job = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No job with id: ${id}`);
    const updatedJob = await Job.findByIdAndUpdate(id, job
        , { new: true });
    res.json(updatedJob);
}

// delete request to delete a job
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No job with id: ${id}`);
    await Job.findByIdAndRemove(id);
    res.json({ message: "Job deleted successfully." });
}
