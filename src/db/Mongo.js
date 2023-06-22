import { mongoClient } from "./config/mongoClient.js";
import { DB_NAME } from "./config/dbname.js";
class Mongo{
    constructor(){
        this.client = mongoClient;
        this.db = this.client.db(DB_NAME);
    }
}

export const mongoConn = new Mongo();