import mongoose from "mongoose";
import validator from "validator";

// Stores the top X submissions to avoid full-querying everytime.
var schema = new mongoose.Schema({
    rank: {
        type: Number,
        min: 1,
        required: true,
        validate: (val)=>{
            return validator.isInt(val);
        }
    },
    submission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submissions',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

var modelFactory = function(mongoose){
    return mongoose.model("Leaderboard", schema)
}

export const Leaderboard = {
    schema,
    modelFactory
}