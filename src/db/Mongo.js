import { MongoClient } from "mongodb";
import 'dotenv/config';

class Mongo{
    constructor(){
        this.client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
        this.db = this.client.db;
    }
}

export const mongoCon = new Mongo();