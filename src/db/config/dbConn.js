import mongoose from "mongoose";
import 'dotenv/config';

let dbName = "thisOrThatDB";
export default class DbConn{
    constructor(){
        this.connected = this.init;
    }
    async init(){
        this.conn = await mongoose.createConnection(process.env.MONGO_DB_CONNECTION_STRING).asPromise();
        this.db = await this.conn.useDb(dbName, {useCache: true}).asPromise();
        return true;
    }
}