import mongoose from "mongoose";
import validator from "validator";

// Stores the top X submissions to avoid full-querying everytime.
// 'user' is redundant as it can be inferred via submission.user
// however it is kept here to avoid said inference and simplify things
export const leaderboardSchema = new mongoose.Schema({
    rank: {
        type: Number,
        min: 1,
        required: true,
        validate: (val)=>{
            return Number.isInteger(val);
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
