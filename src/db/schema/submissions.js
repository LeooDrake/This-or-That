import mongoose from "mongoose";
import validator from "validator";

export const submissionsSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 1,
        maxLength: 128,
        required: true
    },
    image_url: {
        type: String,
        maxLength: 2048,
        required: true,
        validate: (value)=>{
            return validator.isURL(value);
        }
    },
    user: {
        type: {type: mongoose.Schema.Types.ObjectId, ref:'Users'},
        required: true
    },
    total_votes: {
        type: Number,
        min: 0,
        validate: (val)=>{
            return validator.isInt(val);
        }
    }
})