import mongoose from "mongoose";
import {dbName, dbConnectionString} from "../config/options.js";
// Schemas
import { usersSchema } from "./schema/usersSchema.js";
import { submissionsSchema } from "./schema/submissionsSchema.js";
import { leaderboardSchema } from "./schema/leaderboardSchema.js";
import { flagsSchema } from "./schema/flagsSchema.js";
import { testSchema } from "./schema/testSchema.js";

class DbConn{
    constructor(){
        this._connected = this._connect();
    }
    async _connect(){
        this._conn = await mongoose.createConnection(dbConnectionString).asPromise();
        this.db = this._conn.useDb(dbName, {useCache: true});
        return true;
    }
}

class AppDb extends DbConn{
    constructor(){
        super();
        this.ready = this._configure();
    }
    async _configure(){
        await this._connected;
        this._assignModels();
        return true;
    }
    _assignModels(){
        this.models = {
            Test: this.db.model('Test', testSchema),
            Users: this.db.model('Users', usersSchema),
            Submissions: this.db.model('Submissions', submissionsSchema),
            Leaderboard: this.db.model('Leaderboard', leaderboardSchema),
            Flags: this.db.model('Flags', flagsSchema)
        }
    }
}

const appDb = new AppDb();
await appDb.ready;
export { appDb };