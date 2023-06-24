import mongoose from "mongoose";
import 'dotenv/config';

let dbName = "thisOrThatDB";
export default class DbConn{
    constructor(){
        this._connected = this._connect();
    }
    async _connect(){
        this._conn = await mongoose.createConnection(process.env.MONGO_DB_CONNECTION_STRING).asPromise();
        this.db = this._conn.useDb(dbName, {useCache: true});
        return true;
    }
}