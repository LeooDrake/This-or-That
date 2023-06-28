import mongoose from "mongoose";
import {submissionsSchema} from "./submissionsSchema.js";
import {usersSchema} from "./usersSchema.js";

// Stores the top X submissions to avoid full-querying everytime.
// submission are subdocs, so their values are populated on save only.
// this means they may have out-dated values which is an intentional feature
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
        type: submissionsSchema,
        required: true
    }
});
