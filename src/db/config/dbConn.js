import mongoose from "mongoose";
import 'dotenv/config';

export const dbConn = await mongoose
    .createConnection(process.env.MONGO_DB_CONNECTION_STRING)
    .asPromise();