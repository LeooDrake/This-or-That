// DbConn constructor
import DbConn from "./config/DbConn.js";

// Schemas definitions
import {Users} from "./schema/Users.js";
import {Submissions} from "./schema/Submissions.js";
import {Leaderboard} from "./schema/Leaderboard.js";
class AppDb extends DbConn{
    constructor(){
        super();
        this.models = {};
        this.connected.then(()=>{this.buildModels()});
    }

    buildModels(){
        this.models = {
            Users: Users.modelFactory(this.db),
            Submissions: Submissions.modelFactory(this.db),
            Leaderboard: Leaderboard.modelFactory(this.db)
        }
    }
}

const appDb = new AppDb();
await appDb.init();
await appDb.connected;
export { appDb };