import mongoose from "mongoose";
import validator from "validator";

var schema = new mongoose.Schema({
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

var modelFactory = function(mongoose){
    return mongoose.model("Users", schema)
}

export const Users = {
    schema,
    modelFactory
}