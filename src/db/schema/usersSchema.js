import mongoose from "mongoose";
import validator from "validator";

export const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 64,
        unique: true,   // Warning: https://mongoosejs.com/docs/faq.html#unique-doesnt-work
        required: true
    },
    name: {
        type: String,
        minLength: 1,
        maxLength: 64,
        required: true
    },
    password_hash: {
        type: String,
        minLength: 60,
        maxLength: 60,
        required: true
    }
}, { autoIndex: true })