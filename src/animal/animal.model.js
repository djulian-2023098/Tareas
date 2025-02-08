import { Schema, model } from "mongoose";

const animalSchema = Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],
        maxLength: [25, `Can't be overcome 25 characters`]
    },
    description:{
        type: String,
        required:[true, 'Please add a description'],
        maxLength: [75, `Can't be overcome 75 characters`]
    },
    age:{
        type: String,
        required: [true, 'Please add an age'],
        maxLength: [15, `Can't be overcome 15 characters`]
    },
    type:{
        type: String,
        required: [true, 'Please add a type'],
        maxLength: [10, `Can't be overcome 10 characters`]
    },
    keeper:{
        type:String,
        maxLength: [50, `Can't be overcome 50 characters`]
    }
})

export default model ('Animal', animalSchema)