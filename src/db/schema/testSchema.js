import mongoose from "mongoose";

export const testSchema = new mongoose.Schema({
    asdf: {
        type: String,
        required: true
    }
})