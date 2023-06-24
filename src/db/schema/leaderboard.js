import mongoose from "mongoose";
import validator from "validator";

// Stores the top X submissions to avoid full-querying everytime.
export const leaderboardSchema = new mongoose.Schema({
    rank: {
        type: Number,
        min: 1,
        required: true,
        validate: (val)=>{
            return validator.isInt(val);
        }
    },
    submission: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'Submissions'},
        required: true
    },
    user: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
        required: true
    }
})