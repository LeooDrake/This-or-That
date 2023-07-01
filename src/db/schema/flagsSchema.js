import mongoose from "mongoose";
import { flagNames } from "../../config/options.js";
export const flagsSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: Object.values(flagNames),
        required: true,
        unique: true,
    },
    flag: {
        type: Boolean,
        required: true,
    },
}, { autoIndex: true });