import mongoose from "mongoose";
import validator from "validator";

var schema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 1,
        maxLength: 128,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
        unique: true,
        validate: (value)=>{
            return validator.isURL(value);
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users', 
        required: true
    },
    total_votes: {
        type: Number,
        min: 0,
        required: true,
        validate: (val)=>{
            return validator.isInt(val);
        }
    }
}, {autoIndex: true});

var modelFactory = function(mongoose){
    return mongoose.model("Submissions", schema)
}

export const Submissions = {
    schema,
    modelFactory
}