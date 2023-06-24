import DbConn from "./config/DbConn.js";    // DbConn constructor
import modelFactory from "../utils/modelFactory.js";    // model creation helper
// Schemas definitions
import {usersSchema} from "./schema/usersSchema.js";
import {submissionsSchema} from "./schema/submissionsSchema.js";
import {leaderboardSchema} from "./schema/leaderboardSchema.js";
import { testSchema } from "./schema/testSchema.js";

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
            Test: modelFactory(this.db, 'Test', testSchema),
            Users: modelFactory(this.db, 'Users', usersSchema),
            Submissions: modelFactory(this.db, 'Submissions', submissionsSchema),
            Leaderboard: modelFactory(this.db, 'Leaderboard', leaderboardSchema)
        }
    }
}

const appDb = new AppDb();
await appDb.connected;
export { appDb };