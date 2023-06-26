import DbConn from "./config/DbConn.js";    // DbConn constructor
// Schemas
import {usersSchema} from "./schema/usersSchema.js";
import {submissionsSchema} from "./schema/submissionsSchema.js";
import {leaderboardSchema} from "./schema/leaderboardSchema.js";
import {testSchema} from "./schema/testSchema.js";
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
            Leaderboard: this.db.model('Leaderboard', leaderboardSchema)
        }
    }
}

const appDb = new AppDb();
await appDb.connected;
export { appDb };