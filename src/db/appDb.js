import { dbConn } from "./config/dbConn.js";
import { DB_NAME } from "./config/dbname.js";

class AppDb{
    constructor(){
        this.dbConn = dbConn;
        this.db = dbConn.useDb(DB_NAME, {useCache: true});
    }   
}
export const appDb = new AppDb();