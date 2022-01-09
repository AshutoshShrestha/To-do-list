const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async(req,res)=>{
    const allTasks = await Task.find({});
    res.status(200).json({allTasks, count: allTasks.length});
})

const createTask = asyncWrapper(async (req,res)=>{
    const task = await Task.create(req.body);
    res.status(201).json({task, status:"Created"});
})

const getSingleTask = asyncWrapper(async (req,res, next)=>{
    const {id:taskID} = req.params;
    const task = await Task.findOne({_id:taskID});
    if(!task){
        return next(createCustomError(
            `Task with task id ${taskID} does not exist.`,
            404
        ));
        // return res.status(404).json({
        //     "Error":{
        //         "Name":"Bad Request", 
        //         "Message":`Task with task id ${taskID} does not exist.`
        //     }
        // })
    }
    res.status(200).json({task})
})

const updateTask = asyncWrapper(async (req,res)=>{
    const {id:taskID} = req.params;
    
    const task = await Task.findOneAndUpdate(
        {_id:taskID},
        req.body,
        {
            new:true,
            runValidators:true
        },
    )

    res.status(200).json({
        id:taskID, 
        task:task, 
        status: "Updated"});
})

const deleteTask = asyncWrapper(async (req,res)=>{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id:taskID});
    if(!task){
        return next(createCustomError(
            `Task with task id ${taskID} does not exist.`,
            404
        ));
    }
    res.status(200).json({task, status: 'Deleted'})
})

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
};