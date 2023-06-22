import { MongoClient } from "mongodb";
import 'dotenv/config';

export const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);