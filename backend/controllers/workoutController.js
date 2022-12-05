const Workout = require('../models/workout.model.js')
const mongoose = require('mongoose')
const { findOneAndUpdate } = require('../models/workout.model.js')

//get all workout
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    //validate the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: "No such workout"})        
    }

    res.status(200).json(workout)
}

//create new workout
const createWorkout = async (req, res) =>{
    const {title, load, reps} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }

    //add document to database
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch(err){
        res.status(400).json({error: err.message})
    }
}


//delete workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    //validate the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}

//update workout
const updateWorkout = async (req, res) => {
    const {id} = req.params
    const {title, load, reps} = req.body

     //validate the id
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})

    if(!workout){
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)

}

module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}