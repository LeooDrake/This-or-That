import mongoose from "mongoose";
import assert from "assert";

export default function modelFactory(db, name, schema){
    assert(db instanceof mongoose.Connection);
    assert(schema instanceof mongoose.Schema);
    assert(typeof name == "string");
    return db.model(name, schema);
}