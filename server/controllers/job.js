import Job from '../models/job.js';
import mongoose from 'mongoose';

export const getAllJobs = async (req, res) => {
    try{
        const jobs = await Job.find();
        res.status(200).json(jobs);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

//get 10 jobs with pagination
export const getJobs = async (req, res) => {
    try{
        const page = req.query.page;
        // const limit = req.query.limit;
        const limit = 2;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const count = await Job.countDocuments();
        const results = {};
        if(endIndex < count){
            results.next = {
                // return the next page number
                page: (page*1 + 1),
                limit: limit
            }
        }
        if(startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        if(endIndex > count){
            results.end = count;
        } else {
            results.end = endIndex;
        }
        results.count = count;
        results.maxPage = Math.ceil(count / limit);
        results.start = startIndex+1;
        // results.end = endIndex;
        results.results = await Job.find().limit(limit * 1).skip(startIndex).exec();
        res.status(200).json(results);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

//get the amount of jobs
export const getJobsCount = async (req, res) => {
    try{
        const count = await Job.countDocuments();
        res.status(200).json(count);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

//get jobs with only name and location fields
export const getJobsTitleLocation = async (req, res) => {
    try{
        const jobs = await Job.find({}, {name: 1, location: 1, level:1, specializations:1, salary: 1, dateStart: 1, dateEnd: 1});
        res.status(200).json(jobs);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

//get jobs by search query which is wildcard of the name, location, and description
export const getJobsSearch = async (req, res) => {
    try{
        const search = req.query.search;
        const jobs = await Job.find({$or: [{name: {$regex: search, $options: 'i'}}, {location: {$regex: search, $options: 'i'}}, {description: {$regex: search, $options: 'i'}}]});
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
